// ---------------------------------
// Navigation handling

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
mobileNavigationHandler();

// Display footer year

const displayFooterYear = function () {
	const yearSpan = document.querySelector('.footer__year');
	const currentYear = new Date().getFullYear();

	yearSpan.textContent = currentYear;
};
displayFooterYear();

// messenger facebook
const facebookSDK = function () {
	var chatbox = document.getElementById('fb-customer-chat');
	chatbox.setAttribute('page_id', '109763205136637');
	chatbox.setAttribute('attribution', 'biz_inbox');

	window.fbAsyncInit = function () {
		FB.init({
			xfbml: true,
			version: 'v16.0',
		});
	};

	(function (d, s, id) {
		var js,
			fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s);
		js.id = id;
		js.src = 'https://connect.facebook.net/pl_PL/sdk/xfbml.customerchat.js';
		fjs.parentNode.insertBefore(js, fjs);
	})(document, 'script', 'facebook-jssdk');
};
facebookSDK();
