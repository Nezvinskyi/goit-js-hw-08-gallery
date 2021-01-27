import imagesSource from './gallery-items.js';

const refs = {
	gallery: document.querySelector('.js-gallery'),
	largeImage: document.querySelector('.lightbox__image'),
	lightbox: document.querySelector('.js-lightbox'),
	closeBtn: document.querySelector('[data-action="close-lightbox"]'),
}

imagesSource.forEach((image, index) => {
	const imgageMarkup = `<li><a class='gallery__link' href='${image.original}'><img class='gallery__image' src='${image.preview}' data-source='${image.original}' data-index='${index}' alt='${image.description}'/></a></li>`;
	refs.gallery.insertAdjacentHTML('beforeend', imgageMarkup);
})

refs.gallery.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.lightbox.addEventListener('click', onLightboxClick);

function onGalleryClick(event) {
	event.preventDefault();
	console.log(event.target.alt);
	if(event.target.nodeName !== 'IMG') return
	refs.largeImage.src = event.target.dataset.source;
	refs.largeImage.alt = event.target.alt;
	onOpenModal();
}

function onOpenModal() {
	refs.lightbox.classList.add('is-open');
	window.addEventListener('keydown', onEscPress);
	window.addEventListener('keydown', onArrowClick);
}

function onCloseModal() {
	refs.lightbox.classList.remove('is-open');
	refs.largeImage.src = '';
	refs.largeImage.alt = '';
	window.removeEventListener('keydown', onEscPress);
	window.removeEventListener('keydown', onArrowClick);
}

function onLightboxClick(event) {
	if (event.currentTarget.nodeName === event.target.nodeName) {
		onCloseModal();
	};
}

function onEscPress(event) {
	if (event.code === 'Escape') {
		onCloseModal();
	};
}

function onArrowClick(event) {
	let index = 0;
		index = +event.target.firstElementChild.dataset.index;
	console.log('before index', index);
	if (event.code === 'ArrowLeft' && index > 0) {
		index -= 1;
		slider(event, index);
	}
	if (event.code === 'ArrowRight' && index < imagesSource.length-1) {
		index += 1;
		slider(event, index);
	}
	console.log('after index', index);
}
	
function slider(event, index) {
	event.target.firstElementChild.dataset.index = index;
	refs.largeImage.src = imagesSource[index].original;
	refs.largeImage.alt = imagesSource[index].description;
}