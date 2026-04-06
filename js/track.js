!function(){
  var btn=document.getElementById('ctaBtn');
  if(!btn)return;
  var params=new URLSearchParams(location.search);
  var isMobile=/Mobi|Android/i.test(navigator.userAgent);

  btn.addEventListener('click',function(){
    var cid=Date.now().toString(36)+'_'+Math.random().toString(36).substr(2,9);
    var url=new URL(CONFIG.offerUrl);
    url.searchParams.set('click_id',cid);
    CONFIG.utmParams.forEach(function(k){
      var v=params.get(k);
      if(v)url.searchParams.set(k,v);
    });
    url.searchParams.set(CONFIG.affiliateSubIdKey,JSON.stringify({
      cid:cid,
      t:new Date().toISOString(),
      d:isMobile?'m':'d'
    }));
    location.href=url;
  });
}();
