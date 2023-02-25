// Video
const headerVideoEl = document.querySelector('.header__video-c video');
if (headerVideoEl) headerVideoEl.playbackRate = 0.8;

// ---------------------------------
// Navigation handling
const hamburgerEl = document.querySelector('.hamburger');
const navbarMenuEl = document.querySelector('.navbar__menu');

const mobileMenuHandle = function () {
	navbarMenuEl.classList.toggle('navbar__menu--active');
	hamburgerEl.classList.toggle('is-active');
};

hamburgerEl.addEventListener('click', mobileMenuHandle);

// test lazy loading

document.addEventListener('DOMContentLoaded', () => {
	const googleMapEl = document.querySelector('.find-us__map');

	googleMapEl.addEventListener('load', () => {
		googleMapEl.classList.remove('hidden');
	});
});
