// Video
const headerVideoEl = document.querySelector('.header__video-c video');

headerVideoEl.playbackRate = 0.8;

// Change video quality depends of screen size
const videoQuality = window.screen.height > 1080 ? '1080' : window.screen.height > 720 ? '720' : '';
headerVideoEl.src = `./src/video/header-${videoQuality}p.mp4`;

// FAQ section

const faqItems = document.querySelector('.faq__items-c');

// faqItems.addEventListener('click', (e) => {
// 	if (e.target.classList.contains('faq__item-question')) {
// 		const item = e.target.closest('.faq__item');
// 		const answer = item.querySelector('.faq__item-answer');

// 		item.classList.toggle('faq__item--active');

// 		if (item.classList.contains('faq__item--active')) {
// 			answer.style.maxHeight = answer.scrollHeight + 'px';
// 		} else {
// 			answer.style.maxHeight = '0';
// 		}
// 	}
// });

faqItems.addEventListener('click', (e) => {
	if (e.target.closest('.faq__item')) {
		const item = e.target.closest('.faq__item');
		const btn = item.querySelector('.faq__item-btn');
		const answer = item.querySelector('.faq__item-answer');

		item.classList.toggle('faq__item--active');

		if (item.classList.contains('faq__item--active')) {
			answer.style.maxHeight = answer.scrollHeight + 'px';
			btn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
		} else {
			answer.style.maxHeight = '0';
			btn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
		}
	}
});
