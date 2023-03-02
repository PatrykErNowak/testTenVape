const imageEl = document.querySelector('.category__img');

imageEl.addEventListener('mousemove', (e) => {
	const mouse = {
		x: e.layerX,
		y: e.layerY,
	};
	const image = {
		x: imageEl.scrollWidth,
		y: imageEl.scrollHeight,
	};

	const calcRotateDEG = (mouseAxis, elAxisDimension, maxDegree) => {
		return ((mouseAxis / elAxisDimension) * 2 - 1) * maxDegree;
	};

	imageEl.style.transform = `perspective(800px) rotateX(${calcRotateDEG(
		mouse.y,
		image.y,
		15
	)}deg) rotateY(${-calcRotateDEG(mouse.x, image.x, 15)}deg) scale3d(1.03, 1.03, 1.03)`;
});

// Restore position of element when mouse out of the element
imageEl.addEventListener('mouseout', () => {
	imageEl.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
});
