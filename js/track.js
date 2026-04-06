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

  // Odometer rolling counter
  var el=document.getElementById('claimCount');
  if(!el)return;
  var n=23847;
  var strips=[];

  function build(num){
    var s=num.toLocaleString();
    el.innerHTML='';
    strips=[];
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c>='0'&&c<='9'){
        var d=parseInt(c);
        var digit=document.createElement('span');
        digit.className='roller__digit';
        var strip=document.createElement('span');
        strip.className='roller__strip';
        for(var j=0;j<=9;j++){
          var sp=document.createElement('span');
          sp.textContent=j;
          strip.appendChild(sp);
        }
        // Duplicate 0-9 so we can roll forward past 9→0
        for(var j=0;j<=9;j++){
          var sp=document.createElement('span');
          sp.textContent=j;
          strip.appendChild(sp);
        }
        strip.style.transform='translateY(-'+d*5+'%)';
        digit.appendChild(strip);
        el.appendChild(digit);
        strips.push({el:strip,val:d});
      }else{
        var sep=document.createElement('span');
        sep.className='roller__sep';
        sep.textContent=c;
        el.appendChild(sep);
        strips.push(null);
      }
    }
  }

  function rollTo(num){
    var s=num.toLocaleString();
    var si=0;
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c>='0'&&c<='9'){
        var d=parseInt(c);
        while(!strips[si])si++;
        var obj=strips[si];
        if(obj&&obj.val!==d){
          // Always roll forward (up)
          var target=d;
          if(d<obj.val)target=d+10; // wrap: roll past 9 into second set
          obj.el.style.transition='transform .8s cubic-bezier(.15,.85,.3,1)';
          obj.el.style.transform='translateY(-'+target*5+'%)';
          // After animation, snap to real position if wrapped
          if(target>=10){
            (function(strip,realD){
              setTimeout(function(){
                strip.style.transition='none';
                strip.style.transform='translateY(-'+realD*5+'%)';
              },850);
            })(obj.el,d);
          }
          obj.val=d;
        }
        si++;
      }else{
        si++;
      }
    }
    // Handle digit count change (e.g. 9,999 → 10,000)
    if(s.length!==el.children.length){
      build(num);
    }
  }

  build(n);

  function tick(){
    n+=Math.floor(Math.random()*3)+1;
    rollTo(n);
    setTimeout(tick,Math.floor(Math.random()*6000)+8000);
  }
  setTimeout(tick,Math.floor(Math.random()*4000)+5000);
}();
