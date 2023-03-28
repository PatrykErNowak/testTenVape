/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
// ! Background Video
const videoHandler = function () {
  const headerVideoEl = document.querySelector('.header__video-bg video');
  const videoTabletSrc = headerVideoEl.dataset.tabletSrc;
  const videoDesktopSrc = headerVideoEl.dataset.desktopSrc;

  headerVideoEl.playbackRate = 0.8;

  // Change video quality depends of screen size
  if (window.screen.width >= 1200) headerVideoEl.src = videoDesktopSrc;
  else if (window.screen.width >= 768) headerVideoEl.src = videoTabletSrc;
};
videoHandler();

// ! Animated logo in section about us

const animatedLogo = function () {
  const imageEl = document.querySelector('.about-us__logo');

  window.addEventListener('mousemove', (e) => {
    const mouse = {
      x: e.x,
      y: e.y,
    };

    const image = {
      x: window.innerWidth,
      y: window.innerHeight,
    };

    const calcRotateDEG = (mouseAxis, elAxisDimension, maxDegree) =>
      ((mouseAxis / elAxisDimension) * 2 - 1) * maxDegree;

    imageEl.style.transform = `perspective(800px) rotateX(${-calcRotateDEG(
      mouse.y,
      image.y,
      25
    )}deg) rotateY(${calcRotateDEG(
      mouse.x,
      image.x,
      25
    )}deg) scale3d(1.03, 1.03, 1.03)`;
  });
};
animatedLogo();

// ! FAQ section

// Displaying and hiding answer for question // Accordion
const faqItems = document.querySelector('.faq__items-c');

faqItems.addEventListener('click', (e) => {
  if (e.target.closest('.faq__item')) {
    const item = e.target.closest('.faq__item');
    const btn = item.querySelector('.faq__item-btn');
    const answer = item.querySelector('.faq__item-answer');

    item.classList.toggle('faq__item--active');

    if (item.classList.contains('faq__item--active')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      btn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    } else {
      answer.style.maxHeight = '0';
      btn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
      btn.blur();
    }
  }
});
// ---------------------------------------------------------------
// Invoking messenger chat by clicking btn under the section
const faqBtn = document.querySelector('.faq__footer-btn');

faqBtn.addEventListener('click', () => FB.CustomerChat.showDialog());

// ------------------------------------------------------------
// Instargram curator.io

/* curator-feed-default-feed-layout */
(function () {
  let i;
  let e;
  const d = document;
  const s = 'script';
  i = d.createElement('script');
  i.async = 1;
  i.charset = 'UTF-8';
  i.src =
    'https://cdn.curator.io/published/1e117b9f-ba27-4dfd-b456-042976b52df7.js';
  e = d.getElementsByTagName(s)[0];
  e.parentNode.insertBefore(i, e);
})();

// ---------------------------------------------------------------
// Testimonials
// Swiper

const swiper = new Swiper('.mySwiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: false,
  initialSlide: 2,
  coverflowEffect: {
    rotate: 0,
    scale: 1,
    stretch: -10,
    depth: 725,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // pagination: {
  // el: '.swiper-pagination',
  // },
});
