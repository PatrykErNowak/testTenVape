/* eslint-disable prefer-const */
/* eslint-disable no-undef */
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

// Functions for this particural page

// Global Variable used in functions: CategorySlider and scrollToCategory
const mobileScreen = window.innerWidth < 768;

// ! Category slide

const categorySlider = function () {
  const categoryContainer = document.querySelector('.categories__content');
  const categoryItems = categoryContainer.querySelectorAll('.category');
  const categoryBarHeight = 150;

  const removeActiveClass = function () {
    categoryItems.forEach((cat) => {
      cat.classList.remove('category--active');
      // eslint-disable-next-line no-param-reassign
      if (mobileScreen) cat.style.maxHeight = `${categoryBarHeight}px`;
    });
  };

  categoryContainer.addEventListener('click', (e) => {
    const categoryTarget = e.target.closest('.category');

    removeActiveClass();

    if (categoryTarget.classList.contains('category--active') && mobileScreen) {
      categoryTarget.style.maxHeight = `${categoryBarHeight}px`;
      categoryTarget.classList.remove('category--active');
    } else if (categoryTarget) {
      categoryTarget.classList.add('category--active');
      if (mobileScreen)
        categoryTarget.style.maxHeight = `${categoryTarget.scrollHeight}px`;
    }
  });

  document.body.addEventListener('click', (e) => {
    if (!e.target?.closest('.categories__content')) {
      removeActiveClass();
    }
  });
};

// !  Scroll to products clicking by button on specified category

const scrollToCategoryOfProducts = function () {
  const productsContainer = document.querySelector('.products');
  const catLinksContainer = document.querySelector('.categories');

  catLinksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('category__btn')) {
      const { category } = e.target.closest('.category').dataset;
      const section = productsContainer.querySelector(
        `[data-category="${category}"]`
      );
      const navHeight = document
        .querySelector('.navbar')
        .getBoundingClientRect().height;

      window.scrollTo({
        top: section.offsetTop - +navHeight,
        behavior: 'smooth',
      });
    }
  });
};

// ! Section Animation

const sectionAnimationHandle = function () {
  if (mobileScreen) return;
  const categories = document.querySelector('.categories');
  const products = document.querySelectorAll('.products__category');

  const showCategories = function (entries, observer) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.classList.add('section--anime');
      observer.unobserve(entry.target);
    }
  };

  const showProducts = function (entries, observer) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    }
  };

  const catOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.45,
  };
  const proOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const observeCategories = new IntersectionObserver(
    showCategories,
    catOptions
  );
  const observeProducts = new IntersectionObserver(showProducts, proOptions);

  products.forEach((section) => {
    section.classList.add('section--hidden');
    observeProducts.observe(section);
  });
  observeCategories.observe(categories);
};

// ----------------------------------------------------------

// Main functions
mobileNavigationHandler();
displayFooterYear();
facebookMessenger();
scrollToTop();
// Functions for this particural page
categorySlider();
scrollToCategoryOfProducts();
sectionAnimationHandle();
