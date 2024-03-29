/* eslint-disable prefer-const */
/* eslint-disable no-undef */

// ---------------------------------;
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

const cardHoverMobile = function () {
  const mobileAndTabletCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        // eslint-disable-next-line no-useless-escape
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  if (!mobileAndTabletCheck()) return;

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.target.closest('.card');
      target.classList.toggle('active');
    });
  });
};

// ----------------------------------------------------------

// Main functions
mobileNavigationHandler();
displayFooterYear();
facebookMessenger();
scrollToTop();
showAgeVeryficationModal();
cookiesModal();

// Functions for this particural page
categorySlider();
scrollToCategoryOfProducts();
sectionAnimationHandle();
cardHoverMobile();
