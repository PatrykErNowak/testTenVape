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

//
const categorySlider = function () {
  const categoryContainer = document.querySelector('.categories');
  const categoryItems = categoryContainer.querySelectorAll('.category');
  const categoryBarHeight = 125;

  // Init for desktop
  if (mobileScreen)
    categoryItems[0].style.maxHeight = `${categoryItems[0].scrollHeight}px`;

  categoryContainer.addEventListener('click', (e) => {
    const categoryTarget = e.target.closest('.category');
    categoryItems.forEach((cat) => {
      if (categoryTarget !== cat) {
        cat.classList.remove('category--active');
        // eslint-disable-next-line no-param-reassign
        if (mobileScreen) cat.style.maxHeight = `${categoryBarHeight}px`;
      }
    });

    if (categoryTarget.classList.contains('category--active') && mobileScreen) {
      categoryTarget.style.maxHeight = `${categoryBarHeight}px`;
      categoryTarget.classList.remove('category--active');
    } else if (categoryTarget) {
      categoryTarget.classList.add('category--active');
      if (mobileScreen)
        categoryTarget.style.maxHeight = `${categoryTarget.scrollHeight}px`;
    }
  });
};

// ----------------------------------------------------------

// Scroll to products clicking by button on specified category
const scrollToCategoryOfProducts = function () {
  const productsContainer = document.querySelector('.products');
  const catLinksContainer = document.querySelector('.categories');
  const navHeight = document
    .querySelector('.navbar')
    .getBoundingClientRect().height;

  catLinksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('category__btn')) {
      const { category } = e.target.closest('.category').dataset;
      const section = productsContainer.querySelector(
        `[data-category="${category}"]`
      );
      const categoryHeight = e.target
        .closest('.category__body')
        .getBoundingClientRect().height;

      section.style.scrollMarginTop = `${
        mobileScreen ? +categoryHeight : +navHeight
      }px`;
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

// ----------------------------------------------------------
// TODO not completed

const displayProductCard = function () {
  // Logic to implement
  // 1. Add listener for all products - on click
  // 2. Creata database for all products which contains all data for each product
  // 3. Click on product creates a modal by using product ID and matching it in products database

  const productsList = document.querySelector('.products__list');

  const modalHTML = `
  <div class="modal-product">
    <h3 class="modal-product__title">VAPORESSO GEN PT60</h3>
    <img class="modal-product__image" src="../src/img/offer/products/product--1.jpg" alt="">
  
  <div class="modal-product__desc">
  <div class="modal-product__desc-row">
  <h4 class="modal-product__desc-title">OPIS</h4>
  <p class="modal-product__desc-short">Zestaw Max100 producenta Geekvape w kolorze czarno - czerwonym. W skład zestawu wchodzi zasialnie Max100 oraz atomizer Geekvape Z.</p>
  </div>
  <div class="modal-product__desc-row">
  <h4 class="modal-product__desc-title">SPECYFIKACJA</h4>
  <ul class="modal-product__desc-specification">
  <li>Regulacja mocy w zakresie 5-100W</li>
  <li>Kompatybilność z akumulatorami 18650 oraz 21700</li>
  <li>Kolorowy wyświetlacz TFT o przekątnej 1.08"</li>
  <li>Certyfikat IP68 (odporność na wodę, kurz oraz wstrząsy)</li>
  <li>Port USB-C</li>
  </ul>
  </div>
  </div>
  <button class="modal-product__close-btn modal-product__close-btn--top"><i
  class="fa-solid fa-xmark"></i></button>
  <button class="modal-product__close-btn modal-product__close-btn--bottom">Wróć do listy produktów</button>
  
  </div>`;

  const displayProductModal = function (e) {
    // const product = e.target.closest('.product');

    if (e.target.classList.contains('product__btn')) {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');

      modalContainer.innerHTML = modalHTML;
      document.body.append(modalContainer);

      document.body.style.overflow = 'hidden';

      const closeBtns = modalContainer.querySelectorAll(
        '.modal-product__close-btn'
      );
      closeBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
          modalContainer.remove();
          document.body.style.overflow = 'auto';
        })
      );
    }
  };

  productsList.addEventListener('click', displayProductModal);
};

// Main functions
mobileNavigationHandler();
displayFooterYear();
facebookMessenger();
scrollToTop();
// Functions for this particural page
categorySlider();
scrollToCategoryOfProducts();
displayProductCard();
