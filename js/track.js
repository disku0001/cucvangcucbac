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
  var digitEls=[];

  function build(num){
    var s=num.toLocaleString();
    el.innerHTML='';
    digitEls=[];
    for(var i=0;i<s.length;i++){
      var c=s[i];
      if(c>='0'&&c<='9'){
        var d=parseInt(c);
        var wrap=document.createElement('span');
        wrap.className='roller__digit';
        var strip=document.createElement('span');
        strip.className='roller__strip';
        for(var j=0;j<=9;j++){
          var sp=document.createElement('span');
          sp.textContent=j;
          strip.appendChild(sp);
        }
        for(var j=0;j<=9;j++){
          var sp=document.createElement('span');
          sp.textContent=j;
          strip.appendChild(sp);
        }
        strip._val=d;
        strip._pos=d;
        strip.style.transform='translateY(-'+(d*100/20)+'%)';
        wrap.appendChild(strip);
        el.appendChild(wrap);
        digitEls.push(strip);
      }else{
        var sep=document.createElement('span');
        sep.className='roller__sep';
        sep.textContent=c;
        el.appendChild(sep);
      }
    }
  }

  function rollTo(num){
    var s=num.toLocaleString();
    var di=0;
    for(var i=0;i<s.length;i++){
      if(s[i]<'0'||s[i]>'9')continue;
      var d=parseInt(s[i]);
      var strip=digitEls[di];
      if(strip&&strip._val!==d){
        var pos=strip._pos;
        var target;
        if(d>=strip._val){
          target=pos+(d-strip._val);
        }else{
          target=pos+(10-strip._val+d);
        }
        strip.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';
        strip.style.transform='translateY(-'+(target*100/20)+'%)';
        strip._val=d;
        strip._pos=target;
        // Reset position if gone too far (past second set)
        if(target>=18){
          (function(st,dd){
            setTimeout(function(){
              st.style.transition='none';
              st._pos=dd;
              st.style.transform='translateY(-'+(dd*100/20)+'%)';
            },550);
          })(strip,d);
        }
      }
      di++;
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
