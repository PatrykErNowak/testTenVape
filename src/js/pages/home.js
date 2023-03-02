// ! Background Video
const headerVideoEl = document.querySelector('.header__video-c video');

headerVideoEl.playbackRate = 0.8;

// Change video quality depends of screen size
const videoQuality = window.screen.height > 1080 ? '1080' : window.screen.height > 720 ? '720' : '';
headerVideoEl.src = `./src/video/header-${videoQuality}p.mp4`;

// ! Aniated logo in section about us

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

	const calcRotateDEG = (mouseAxis, elAxisDimension, maxDegree) => {
		return ((mouseAxis / elAxisDimension) * 2 - 1) * maxDegree;
	};

	imageEl.style.transform = `perspective(800px) rotateX(${-calcRotateDEG(
		mouse.y,
		image.y,
		25
	)}deg) rotateY(${calcRotateDEG(mouse.x, image.x, 25)}deg) scale3d(1.03, 1.03, 1.03)`;
});

// ! FAQ section

// Displaying and hiding answer for question // Accordion
const faqItems = document.querySelector('.faq__items-c');

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
			btn.blur();
		}
	}
});

// Invoking messenger chat by clicking btn under the section
const faqBtn = document.querySelector('.faq__footer-btn');

faqBtn.addEventListener('click', () => chatbox.click());
