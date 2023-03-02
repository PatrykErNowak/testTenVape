// ---------------------------------
// Navigation handling
const hamburgerEl = document.querySelector('.hamburger');
const navbarMenuEl = document.querySelector('.navbar__menu');

const mobileMenuHandle = function () {
	navbarMenuEl.classList.toggle('navbar__menu--active');
	hamburgerEl.classList.toggle('is-active');
};

hamburgerEl.addEventListener('click', mobileMenuHandle);

// messenger facebook
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
