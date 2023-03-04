// const categoryItems = document.querySelectorAll('.category');

const rotate3dElement = function (e, target, maxDegrees, scale) {
	const mouse = {
		x: e.layerX,
		y: e.layerY,
	};
	const image = {
		x: target.scrollWidth,
		y: target.scrollHeight,
	};

	const calcRotateDEG = (mouseAxis, elAxisDimension, maxDegree) => {
		return ((mouseAxis / elAxisDimension) * 2 - 1) * maxDegree;
	};

	target.style.transform = `perspective(800px) rotateX(${calcRotateDEG(
		mouse.y,
		image.y,
		maxDegrees
	)}deg) rotateY(${-calcRotateDEG(mouse.x, image.x, maxDegrees)}deg) scale3d(${scale}, ${scale}, ${scale})`;
};

// categoryItems.forEach(function (cat) {
// 	cat.addEventListener('mousemove', function (e) {
// 		rotate3dElement(e, cat, 10, 1.02);
// 	});
// 	cat.addEventListener('mouseout', () => {
// 		cat.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
// 	});
// });

// ! --------------

const categoryContainer = document.querySelector('.categories');
const categoryItems = categoryContainer.querySelectorAll('.category');

categoryContainer.addEventListener('click', (e) => {
	const categoryTarget = e.target.closest('.category');
	if (window.innerWidth < 768) {
		categoryItems.forEach((cat) => {
			if (categoryTarget !== cat) {
				cat.classList.remove('category--active');
				cat.style.maxHeight = '150px';
			}
		});

		if (categoryTarget.classList.contains('category--active')) {
			categoryTarget.classList.remove('category--active');
			categoryTarget.style.maxHeight = '150px';
		} else if (categoryTarget) {
			categoryTarget.classList.add('category--active');
			categoryTarget.style.maxHeight = categoryTarget.scrollHeight + 'px';
		}
	}
});
