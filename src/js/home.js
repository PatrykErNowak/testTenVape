/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

// Cookie Handle functions

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  let name = `${cname}=`;
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const showAgeVeryficationModal = function () {
  // Check Cookie
  if (getCookie('ageOver18') === 'yes') return;

  // Creating & Add modal
  const modalContainer = document.createElement('div');
  const modalHTML = `<div class="modal-age">
<div class="modal-age__content">
    <img class="modal-age__logo" src="./img/tenvape-logo-text.png" alt="">
    <p class="modal-age__text">Czy masz skończone 18 lat?</p>
    <div class="modal-age__btns">
        <button class="btn btn--confirm">Tak</button>
        <button class="btn btn--denied">Nie</button>
    </div>
    <p class="modal-age__text-small">Wchodząc na stronę naszego sklepu potwierdzasz, że jesteś osobą
        pełnoletnią.</p>
</div>
</div>`;

  document.body.style.overflow = 'hidden';
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = modalHTML;

  // Modal behavior
  const btnConfirmAge = modalContainer.querySelector('.btn--confirm');
  const btnDeniedAge = modalContainer.querySelector('.btn--denied');

  btnConfirmAge.addEventListener('click', () => {
    setCookie('ageOver18', 'yes', 7);
    modalContainer.style.opacity = 0;
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      btnConfirmAge.closest('.modal-container').remove();
    }, 1000);
  });

  btnDeniedAge.addEventListener('click', () => {
    window.location.href = 'https://www.google.pl';
  });

  document.body.append(modalContainer);
};

const cookiesModal = function () {
  // Check cookies
  if (getCookie('cookies') === 'yes') return;

  // Create modal
  const modal = document.createElement('div');

  modal.classList.add('modal-cookies');
  modal.innerHTML = `<p class="modal-cookies__text">Ta strona wykorzystuje pliki cookie. Używamy informacji zapisanych za pomocą
  plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu.</p><button class="modal-cookies__btn btn btn--confirm">Akceptuję</button>`;

  document.body.append(modal);

  // Modal Behavior
  const btn = modal.querySelector('button');

  const acceptCookies = function () {
    setCookie('cookies', 'yes', 365);
    modal.remove();
  };

  btn.addEventListener('click', acceptCookies);
};

// ---------------------------------;
// Navigation handling;
const mobileNavigationHandler = function () {
  const hamburgerEl = document.querySelector('.hamburger');
  const navbarMenuEl = document.querySelector('.navbar__menu');

  const mobileMenuHandle = function () {
    navbarMenuEl.classList.toggle('navbar__menu--active');
    hamburgerEl.classList.toggle('is-active');
    if (navbarMenuEl.classList.contains('navbar__menu--active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  hamburgerEl.addEventListener('click', mobileMenuHandle);
};

// Display footer year
const displayFooterYear = function () {
  const yearSpan = document.querySelector('.footer__year');
  const currentYear = new Date().getFullYear();

  yearSpan.textContent = currentYear;
};

// Facebook messenger
const facebookMessenger = function () {
  const chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute('page_id', '109763205136637');
  chatbox.setAttribute('attribution', 'biz_inbox');

  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v16.0',
    });
  };

  (function (d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/pl_PL/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

// Scroll to Top
const scrollToTop = function () {
  const btn = document.querySelector('.btn__scroll-to-top');
  const mainContent = document.querySelector('header');

  const showBtn = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  };

  const screenObserve = new IntersectionObserver(showBtn, {
    root: null,
    threshold: 0.3,
  });

  const scrollToTopHandle = function () {
    document.documentElement.scrollTo({ top: 0 });
  };

  screenObserve.observe(mainContent);
  btn.addEventListener('click', scrollToTopHandle);
};

// --------------------------------------------------------------------------------------------------------
// Functions for this particural site
// ! Scroll to the first main section

const scrollToMainContent = function () {
  const btn = document.querySelector('.header__btn-scrolldown');
  const targetSection = document.querySelector('main');

  btn.addEventListener('click', () =>
    targetSection.scrollIntoView({ behavior: 'smooth' })
  );
};

// ! Section Animation

const sectionAnimationHandle = function () {
  const sections = document.querySelectorAll('.section');

  const showSection = function (entries, observer) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  };

  const options = {
    root: null,
    rootMargin: '-100px',
    threshold: 0.05,
  };

  const observeSection = new IntersectionObserver(showSection, options);

  sections.forEach((section) => {
    section.classList.add('section--hidden');
    observeSection.observe(section);
  });
};

// ! Background Video
const videoHandler = function () {
  const headerVideoEl = document.querySelector('.header__video-bg video');
  const videoDesktopSrc = headerVideoEl.dataset.desktopSrc;

  headerVideoEl.playbackRate = 0.8;

  // Change video quality depends of screen size
  if (window.screen.width >= 1200) headerVideoEl.src = videoDesktopSrc;
};

// ! Animated logo in section about us

const animated3DLogo = function () {
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

// ! FAQ section

// Displaying and hiding answer for question // Accordion

const accordionFAQSection = function () {
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
};

// ---------------------------------------------------------------
// Invoking messenger chat by clicking btn under the section

const InvokingMessengerChatbyFAQBtn = function () {
  const btns = document.querySelectorAll('[data-type="messenger"');

  btns.forEach((btn) =>
    btn.addEventListener('click', () => FB.CustomerChat.showDialog())
  );
};

// ------------------------------------------------------------
// Instargram curator.io

/* curator-feed-default-feed-layout */
const instagramCurator = function () {
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
};

// ---------------------------------------------------------------
// Testimonials
// Swiper
const TestimonialsHandler = function () {
  const swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: false,
    initialSlide: 3,
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
  });
};

// Main functions
mobileNavigationHandler();
displayFooterYear();
facebookMessenger();
scrollToTop();

// Functions for this particural page
showAgeVeryficationModal();
scrollToMainContent();
animated3DLogo();
sectionAnimationHandle();
videoHandler();
instagramCurator();
TestimonialsHandler();
accordionFAQSection();
InvokingMessengerChatbyFAQBtn();

cookiesModal();
