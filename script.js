// script.js
// 섹션 스크롤 컨트롤
/* const sections = document.querySelectorAll("section, footer");
let current = 0, isScrolling = false;

function scrollToSection(idx){
  isScrolling = true;
  sections[idx].scrollIntoView({ behavior:'smooth' });
  setTimeout(()=> isScrolling=false, 800);
} */

/*   const sections = document.querySelectorAll("section, footer");
  let current = 0;
  let isScrolling = false;
  
  function scrollToSection(idx) {
    isScrolling = true;
    const offset = sections[idx].offsetTop;
  
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
  
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
  
    if (e.deltaY > 0 && current < sections.length - 1) {
      current++;
    } else if (e.deltaY < 0 && current > 0) {
      current--;
    }
  
    scrollToSection(current);
  }); */

// 마우스휠..
/* window.addEventListener("wheel", e => {
  if(isScrolling) return;
  if(e.deltaY>0 && current<sections.length-1) current++;
  else if(e.deltaY<0 && current>0) current--;
  scrollToSection(current);
});
 */

// 부드러운 스크롤
/* const sections = document.querySelectorAll('section');
const empties = document.querySelectorAll('.empty');

const allSections = [...document.querySelectorAll('section'), ...document.querySelectorAll('.empty')];

let current = 0;
let isScrolling = false;

function scrollToSection(index) {
    isScrolling = true;
    allSections[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isScrolling = false; }, 1000); // debounce
}

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && current < allSections.length - 1) {
        current++;
        scrollToSection(current);
    } else if (e.deltaY < 0 && current > 0) {
        current--;
        scrollToSection(current);
    }
}); */


// 스크롤롤
document.addEventListener("DOMContentLoaded", () => {
  const slideIns = document.querySelectorAll('.slide-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  slideIns.forEach(el => observer.observe(el));
});

// fade-up



// 스크롤 시 헤더 숨김
var didScroll;

var lastScrollTop = 0;
var delta = 5; //동작의 구현이 시작되는 위치
var navbatHeight = $('.header').outerHeight(); //영향을 받을 요소를 선택

$(window).scroll(function(evnet){ //스크롤 시 사용자가 스크롤했다는 것을 알림
  didScroll  = true;
});

setInterval(function(){ //hasScrolled()를 실행하고 didScroll 상태를 재설정
  if (didScroll) {
    hasScrolled();
    didScroll = true;
  }
}, 200);

function hasScrolled(){
  const st = $(this).scrollTop();

  if(Math.abs(lastScrollTop - st) <= delta)
    return;

  if(st > lastScrollTop && st > navbatHeight){
    // Scroll Down
    $('.header').addClass('nav-up');
    //$('header').removeClass('nav-down').addClass('nav-up');
  } else {
    if(st + $(window).height() < $(document).height()) {
      // Scroll Up
      $('.header').removeClass('nav-up');
      //$('header').removeClass('nav-up').addClass('nav-down');
    }
  }
  lastScrollTop = st
}


// 메인 페이지 그라데이션
document.addEventListener('DOMContentLoaded', () => {
  // const interBubble = document.querySelector < HTMLDivElement > ('.interactive') !;
  const interBubble = document.querySelector('.interactive');
  if (!interBubble) return;  // 존재하지 않으면 종료
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }

  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});




// VanillaTilt 초기화
/* VanillaTilt.init(document.querySelector(".box-container"), {
  max: 50,
  speed: 400
}); */

// background 의 icon-mind (blue) 눈 움직이게 하기
document.addEventListener("mousemove", function (e) {
  const eyes = document.querySelectorAll(".eye");

  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const angle = Math.atan2(dy, dx);
    const radius = 10; // 눈동자 움직이는 최대 거리

    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    // 기존 중앙 정렬 유지하면서 움직임 적용
    eye.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  });
});

// system-tier 애니메이션
 // Intersection Observer를 사용한 애니메이션 트리거
 const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          // 무지개 바 애니메이션 시작
          const gradientBar = document.querySelector('.tier-gradient-bar');
          gradientBar.classList.add('animate');
          
          // 캐릭터 아이템들 애니메이션 시작
          const characterItems = document.querySelectorAll('.tier-character-item');
          characterItems.forEach((item) => {
              item.classList.add('animate');
          });
          
          // 레이블 애니메이션 시작
          const labels = document.querySelectorAll('.tier-label');
          labels.forEach((label) => {
              label.classList.add('animate');
          });
          
          // 한 번만 실행되도록 observer 해제
          observer.unobserve(entry.target);
      }
  });
}, { 
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
});

// 페이지 로드 후 observer 시작
document.addEventListener('DOMContentLoaded', () => {
  const tierSection = document.querySelector('#system-tier');
  if (tierSection) {
      observer.observe(tierSection);
  }
});

// 결론 페이지
// 마우스 움직임에 따라 배경 텍스트가 살짝 이동하는 효과
/* document.addEventListener("mousemove", (e) => {
  const txt = document.querySelector(".conclusion-back-txt");
  if (!txt) return;

  // 화면 가운데 기준으로 마우스 위치 비율 계산
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  // 이동 적용
  txt.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
});
 */

// 앱 콘텐츠 스크롤
// 내용들 배열로 만들기
/* const appFeatures = [
  {
    title: '마음-씨 서비스 시작하기',
    desc: `계정을 연동해 마음-씨 서비스에 회원 가입할 수 있습니다.<br>
           당신의 <span class="black-spam">좋은 안전 습관</span>을 위한 ‘마음-씨’ 앱을 만나보세요.`,
    img: 'img/app-start.png'
  },
  {
    title: '마음-씨의 메인 화면',
    desc: `메뉴를 클릭하여 세부 페이지로 이동합니다.<br>
           내 차의 정보와 오늘의 미션 등 <span class="black-spam">좋은 안전 습관</span>를 제공합니다.`,
    img: 'img/app-start.png'
  },
  {
    title: '나의 운전 정보 확인하기 1',
    desc: `나의 운전 점수를 <span class="black-spam">실시간으로 상세하게</span> 볼 수 있습니다.<br>
           우리 동네 랭킹 또한 스크롤 시 확인할 수 있으며,<br>
           내가 <span class="black-spam">지금까지 획득한 명예 배지들</span>이 전시되어 있습니다.`,
    img: 'img/app-drive-1.png'
  },
  {
    title: '나의 운전 정보 확인하기 2',
    desc: `나의 운전 점수를 <span class="black-spam">실시간으로 상세하게</span> 볼 수 있습니다.<br>
           우리 동네 랭킹 또한 스크롤 시 확인할 수 있으며,<br>
           내가 <span class="black-spam">지금까지 획득한 명예 배지들</span>이 전시되어 있습니다.`,
    img: 'img/app-drive-2.png'
  },
  {
    title: '우리 동네 티어 확인하기',
    desc: `<span class="black-spam">우리 동네의 등수와 티어</span>를 알 수 있으며 해당 화면은 공유가<br>
           가능합니다. 다함께 성장해, 그랜드 마스터급을 달성해보세요!`,
    img: 'img/app-tier.png'
  },
  {
    title: '나의 랭킹 확인하기',
    desc: `나의 랭킹에 맞는 색상과 아이콘이 보여지며<br>
           <span class="black-spam">안전운전에 대한 감사 문구</span>가 나타납니다.`,
    img: 'img/app-rank.png'
  }
];


let currentIndex = 0;
let canScroll = true;

function showAppFeature(index) {
  const feature = appFeatures[index];
  const textBox = document.getElementById('appTextBox');
  const img = document.getElementById('appImage');

  if (!textBox || !img) return;

  textBox.innerHTML = `
    <h2>${feature.title}</h2>
    <p>${feature.desc}</p>
  `;

  img.classList.remove('on');
  setTimeout(() => {
    img.src = feature.img;
    img.classList.add('on');
  }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  showAppFeature(currentIndex);
}); */

// 🔧 scroll 위치 기준으로 이벤트 적용
window.addEventListener('wheel', (e) => {
  if (!canScroll) return;

  const serviceApp = document.getElementById('service-app');
  const rect = serviceApp.getBoundingClientRect();

  // 현재 뷰포트 안에 들어온 상태에서만 작동
  if (rect.top <= 100 && rect.bottom > 100) {
    if (e.deltaY > 0) {
      if (currentIndex < appFeatures.length - 1) {
        currentIndex++;
        showAppFeature(currentIndex);
      } else {
        // 스크롤 해제
        document.body.classList.add('scrolled-past-app');
      }
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      showAppFeature(currentIndex);
      document.body.classList.remove('scrolled-past-app');
    }

    canScroll = false;
    setTimeout(() => (canScroll = true), 800);
  }
});

// 


  // 텍스트 복제해서 무한 스크롤 구현
  const wrapper = document.getElementById('scroll-wrapper');
  const text = document.getElementById('scroll-text');
  const clone = text.cloneNode(true);
  wrapper.appendChild(clone);


  // 스크롤 이벤트가 왜 안되는걸까
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // 한 번만 실행되게
        }
      });
    }, {
      threshold: 0.2 // 20% 보일 때 실행
    });
  
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  });

