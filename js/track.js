!function(){
  var params=new URLSearchParams(location.search);
  var isMobile=/Mobi|Android/i.test(navigator.userAgent);

  function buildOfferUrl(){
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
    return url.toString();
  }

  function bindCta(id){
    var b=document.getElementById(id);
    if(b)b.addEventListener('click',function(){location.href=buildOfferUrl();});
  }
  bindCta('ctaBtn');
  bindCta('ctaBtn2');

  // View switching
  var hero=document.getElementById('viewHero');
  var steps=document.getElementById('viewSteps');
  var howBtn=document.getElementById('howBtn');
  var backBtn=document.getElementById('backBtn');

  function show(target,hide){
    hide.classList.remove('is-active');
    hide.setAttribute('aria-hidden','true');
    setTimeout(function(){
      target.classList.add('is-active');
      target.setAttribute('aria-hidden','false');
      window.scrollTo({top:0,behavior:'smooth'});
    },200);
  }

  if(howBtn&&steps&&hero){
    howBtn.addEventListener('click',function(){show(steps,hero);});
  }
  if(backBtn&&steps&&hero){
    backBtn.addEventListener('click',function(){show(hero,steps);});
  }
}();
