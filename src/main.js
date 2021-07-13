//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
//Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import images from "./gallery-items.js"

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalImg: document.querySelector(".lightbox__image"),
  modalLightBox: document.querySelector(".js-lightbox"),
  modalCloseBtn: document.querySelector(' button[data-action="close-lightbox"]'),
}

function createMarkup({ preview, original, description }) {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
}

const imageEls = images.map(createMarkup).join("")

refs.gallery.insertAdjacentHTML("beforeend", imageEls)

//step2

refs.gallery.addEventListener("click", onImgClick)

function onImgClick(evt) {
  evt.preventDefault()

  if (!evt.target.classList.contains("gallery__image")) {
    return
  }

  refs.modalLightBox.classList.add("is-open")

  refs.modalImg.src = evt.target.dataset.source
}

//step3

refs.modalCloseBtn.addEventListener("click", onCloseBtn)

function onCloseBtn(evt) {
  refs.modalLightBox.classList.remove("is-open")
  evt.target.dataset.source = ""
}
