const categoryItems = document.querySelectorAll('.category');

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
