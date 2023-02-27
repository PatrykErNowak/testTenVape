// ---------------------------------
// Navigation handling
const hamburgerEl = document.querySelector('.hamburger');
const navbarMenuEl = document.querySelector('.navbar__menu');

const mobileMenuHandle = function () {
	navbarMenuEl.classList.toggle('navbar__menu--active');
	hamburgerEl.classList.toggle('is-active');
};

hamburgerEl.addEventListener('click', mobileMenuHandle);
