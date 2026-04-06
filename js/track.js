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

  // Rolling counter
  var el=document.getElementById('claimCount');
  if(!el)return;
  var n=23847;

  function render(num){
    var s=num.toLocaleString();
    var html='';
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c>='0'&&c<='9'){
        var d=parseInt(c);
        html+='<span class="roller__digit"><span class="roller__strip" data-d="'+d+'" style="transform:translateY(-'+d+'0%)">';
        for(var j=0;j<=9;j++)html+='<span>'+j+'</span>';
        html+='</span></span>';
      }else{
        html+=c;
      }
    }
    el.innerHTML=html;
  }

  function update(num){
    var s=num.toLocaleString();
    var digits=el.querySelectorAll('.roller__strip');
    var di=0;
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c>='0'&&c<='9'){
        if(digits[di]){
          digits[di].style.transform='translateY(-'+c+'0%)';
          digits[di].setAttribute('data-d',c);
        }
        di++;
      }
    }
  }

  render(n);

  setInterval(function(){
    n+=Math.floor(Math.random()*3)+1;
    update(n);
  },Math.floor(Math.random()*6000)+8000);
}();
