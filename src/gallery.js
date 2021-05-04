import gallery from "./gallery-items.js";

const paletteContainer = document.querySelector(".js-gallery");
const cardsMarkup = renderGallery(gallery);
const lightboxEl = document.querySelector(".js-lightbox");
const btnClose = document.querySelector('button[data-action="close-lightbox"]');
const modalImg = document.querySelector(".lightbox__image");
const overlayEl = document.querySelector(".lightbox__overlay");

paletteContainer.insertAdjacentHTML("beforeend", cardsMarkup);
paletteContainer.addEventListener("click", onPaletteContainerClick);
btnClose.addEventListener("click", onModalClose);
overlayEl.addEventListener("click", onOverlayClose);

function renderGallery(gallery) {
  const li = gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" 
    data-source="${original}" alt="${description}"/>
  </a>
</li>`;
    })
    .join(' ');

  return li;
}

function onPaletteContainerClick(event) {
    window.addEventListener('keydown', onEscKeyPress);
  event.preventDefault();
  const targetImg = event.target.classList.contains("gallery__image");

  if (targetImg) {
    lightboxEl.classList.add("is-open");

    modalImg.src = event.target.dataset.source;
  }
}

function onModalClose() {
    window.removeEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.remove("is-open");
  modalImg.src = "";
}

function onOverlayClose(event) {
  if (event.currentTarget === event.target) {
    onModalClose();
  }
}

function onEscKeyPress(event){
    if(event.code === 'Escape'){
        onModalClose();
    }
    
}

