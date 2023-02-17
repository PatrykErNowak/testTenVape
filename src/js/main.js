// Video
const headerVideoEl = document.querySelector('.header__video-c video');
headerVideoEl.playbackRate = 0.8;

// ---------------------------------
// Navigation handling
const hamburgerEl = document.querySelector('.hamburger');
const navbarMenuEl = document.querySelector('.navbar__menu');

const mobileMenuHandle = function () {
	navbarMenuEl.classList.toggle('navbar__menu--active');
	hamburgerEl.classList.toggle('is-active');
};

hamburgerEl.addEventListener('click', mobileMenuHandle);
