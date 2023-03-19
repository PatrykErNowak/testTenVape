const mobileScreen = window.innerWidth < 768;

//
const categorySlider = function () {
	const categoryContainer = document.querySelector('.categories');
	const categoryItems = categoryContainer.querySelectorAll('.category');
	const categoryBarHeight = 125;

	//Init for desktop
	if (mobileScreen) categoryItems[0].style.maxHeight = categoryItems[0].scrollHeight + 'px';

	categoryContainer.addEventListener('click', (e) => {
		const categoryTarget = e.target.closest('.category');
		categoryItems.forEach((cat) => {
			if (categoryTarget !== cat) {
				cat.classList.remove('category--active');
				if (mobileScreen) cat.style.maxHeight = `${categoryBarHeight}px`;
			}
		});

		if (categoryTarget.classList.contains('category--active') && mobileScreen) {
			categoryTarget.style.maxHeight = `${categoryBarHeight}px`;
			categoryTarget.classList.remove('category--active');
		} else if (categoryTarget) {
			categoryTarget.classList.add('category--active');
			if (mobileScreen) categoryTarget.style.maxHeight = categoryTarget.scrollHeight + 'px';
		}
	});
};

categorySlider();

// ----------------------------------------------------------

// Scroll to products clicking by button on specified category
const scrollToCategoryOfProducts = function () {
	const productsContainer = document.querySelector('.products');
	const catLinksContainer = document.querySelector('.categories');
	const navHeight = document.querySelector('.navbar').getBoundingClientRect().height;

	catLinksContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('category__btn')) {
			const category = e.target.closest('.category').dataset.category;
			const section = productsContainer.querySelector(`[data-category="${category}"]`);
			const categoryHeight = e.target.closest('.category__body').getBoundingClientRect().height;

			section.style.scrollMarginTop = `${mobileScreen ? +categoryHeight : +navHeight}px`;
			section.scrollIntoView({ behavior: 'smooth' });
		}
	});
};

scrollToCategoryOfProducts();

// ----------------------------------------------------------
// TODO not completed

const productsList = document.querySelector('.products__list');

const modalHTML = `
<div class="modal-product">
	<h3 class="modal-product__title">VAPORESSO GEN PT60</h3>
	<img class="modal-product__image" src="../src/img/offer/products/product--1.jpg" alt="">

	<div class="modal-product__desc">
		<div class="modal-product__desc-row">
			<h4 class="modal-product__desc-title">OPIS</h4>
			<p class="modal-product__desc-short">Zestaw Max100 producenta Geekvape w kolorze czarno - czerwonym.
				W
				skład zestawu wchodzi zasialnie Max100 oraz atomizer Geekvape Z.</p>
		</div>
		<div class="modal-product__desc-row">
			<h4 class="modal-product__desc-title">SPECYFIKACJA</h4>
			<ul class="modal-product__desc-specification">
				<li>Regulacja mocy w zakresie 5-100W</li>
				<li>Kompatybilność z akumulatorami 18650 oraz 21700</li>
				<li>Kolorowy wyświetlacz TFT o przekątnej 1.08"</li>
				<li>Certyfikat IP68 (odporność na wodę, kurz oraz wstrząsy)</li>
				<li>Port USB-C</li>
			</ul>
		</div>
	</div>
	<button class="modal-product__close-btn modal-product__close-btn--top"><i
			class="fa-solid fa-xmark"></i></button>
	<button class="modal-product__close-btn modal-product__close-btn--bottom">Wróć do listy produktów</button>

</div>`;

const displayProductModal = function (e) {
	const product = e.target.closest('.product');

	if (e.target.classList.contains('product__btn')) {
		const modalContainer = document.createElement('div');
		modalContainer.classList.add('modal-container');

		modalContainer.innerHTML = modalHTML;
		document.body.append(modalContainer);

		document.body.style.overflow = 'hidden';

		const closeBtns = modalContainer.querySelectorAll('.modal-product__close-btn');
		closeBtns.forEach((btn) =>
			btn.addEventListener('click', () => {
				modalContainer.remove();
				document.body.style.overflow = 'auto';
			})
		);
	}
};

productsList.addEventListener('click', displayProductModal);
