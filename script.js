document.addEventListener('DOMContentLoaded',()=>{
  // ========== HEADER SCROLL EFFECT ==========
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',window.scrollY>50);
  },{passive:true});

  // ========== PARALLAX EFFECT ==========
  const parallax = ()=>{
    document.querySelectorAll('[data-speed]').forEach(el=>{
      const speed=parseFloat(el.dataset.speed)||0.1;
      const y=window.scrollY*speed;
      el.style.transform=`translateY(${y}px)`;
    });
  };
  window.addEventListener('scroll',parallax,{passive:true});

  // ========== REVEAL ON SCROLL ==========
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible');});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // ========== 3D CARD TILT ==========
  document.querySelectorAll('.property-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-0.5;
      const y=(e.clientY-rect.top)/rect.height-0.5;
      card.style.transform=`rotateX(${-y*8}deg) rotateY(${x*10}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });

  // ========== COUNTER ANIMATIONS ==========
  document.querySelectorAll('.num').forEach(el=>{
    const target=+el.dataset.target;
    let started=false;
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting&&!started){
          started=true;
          let i=0;
          const step=Math.ceil(target/120);
          const t=setInterval(()=>{
            i+=step;
            el.textContent=i>target?target:i;
            if(i>=target)clearInterval(t);
          },12);
        }
      });
    },{threshold:.6});
    obs.observe(el);
  });

  // ========== TESTIMONIAL CAROUSEL ==========
  const slides=document.querySelectorAll('.slide');
  let slideIdx=0;
  if(slides.length){
    setInterval(()=>{
      slides[slideIdx].classList.remove('active');
      slideIdx=(slideIdx+1)%slides.length;
      slides[slideIdx].classList.add('active');
      const s=document.querySelector('.slides');
      if(s) s.style.transform=`translateX(-${slideIdx*100}%)`;
    },5000);
  }

  // ========== LIGHTBOX ==========
  document.querySelectorAll('.masonry img').forEach(img=>{
    img.addEventListener('click',()=>{
      const lb=document.getElementById('lightbox');
      if(!lb) return;
      lb.querySelector('img').src=img.src;
      lb.style.display='flex';
    });
  });
  const lbClose=document.querySelector('.lb-close');
  if(lbClose) lbClose.addEventListener('click',()=>{document.getElementById('lightbox').style.display='none';});

  // ========== CONTACT FORM ==========
  const contactForm=document.getElementById('contactForm');
  if(contactForm) contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    alert('Thank you! We will get back to you shortly.');
    e.target.reset();
  });

  // ========== RESPONSIVE GALLERY ==========
  const setMasonryCols=()=>{
    const c=window.innerWidth<600?1:window.innerWidth<900?2:3;
    const m=document.querySelector('.masonry');
    if(m) m.style.columnCount=c;
  };
  setMasonryCols();
  window.addEventListener('resize',setMasonryCols);

  // ========== SEARCH FUNCTIONALITY ==========
  const searchBtn=document.getElementById('searchBtn');
  if(searchBtn) searchBtn.addEventListener('click',()=>{
    const props=document.querySelector('#properties .grid');
    if(props) props.scrollIntoView({behavior:'smooth'});
  });

  // ========== YEAR IN FOOTER ==========
  const yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();

  // ========== CSS ANIMATION INJECTION ==========
  const style=document.createElement('style');
  style.textContent=`
    @keyframes particle-float{
      0%{transform:translateY(0) translateX(0);opacity:0.3}
      50%{transform:translateY(-20px) translateX(10px);opacity:0.7}
      100%{transform:translateY(-40px) translateX(-5px);opacity:0}
    }
  `;
  document.head.appendChild(style);

});
