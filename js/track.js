!function(){
  function bindCta(id){
    var b=document.getElementById(id);
    if(b)b.addEventListener('click',function(){location.href=CONFIG.offerUrl;});
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
