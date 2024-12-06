// Funzione che gestisce il numero di foto da stampare in pagina (viene richiamata ogni volta che si scorre la pagina)
function displayMorePhotos() {
  isLoading = true;
  const photosToShow = photos.slice(visibleCount, visibleCount + 6);
  printPhotos(photosToShow);
  visibleCount += 6;
  isLoading = false;
}

// Funzione per capitalizzare la prima parola di una stringa
function capitalizeFirstWord(str) {
  const words = str.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}

// Funzione per stampare in pagina le foto inviate dalla funzione printPhotos(), aggiungendogli le funzioni di hover e click
function printPhoto({ title, url }) {
  const caption = capitalizeFirstWord(title)
  const newPhoto = document.createElement('div');
  newPhoto.className = 'polaroid position-relative d-none';
  newPhoto.innerHTML = `
      <div class="pin position-absolute">
        <img src="./assets/img/pin.svg" alt="">
      </div>
      <div class="photo-wrapper">
        <img src="${url}" alt="${title}" onerror="this.src='${placeHolderPhoto}'" onload="this.parentNode.parentNode.classList.remove('d-none')">
      </div>
      <div class="photo-caption">
        <p>${caption}</p>
      </div>
    `;
  domElements.polaroidWrapper.appendChild(newPhoto);
  applyDomEvents(newPhoto, url, title)
}

// Funzione che itera le foto filtrate dalla funzione displayMorePhotos() e le invia alla funzione di render in pagina
function printPhotos(photoList) {
  photoList.forEach(photo => {
    printPhoto(photo);
  });
}

// Funzione che applica le funzioni di click e hover alle schede delle immagini
function applyDomEvents(element, url, title) {
  element.addEventListener('mouseenter', el => {
    doCardHover(el.target)
  })
  element.addEventListener('mouseleave', el => {
    doCardHover(el.target)
  })
  element.addEventListener('click', () => {
    showLightBox(url, title)
  })
}

// Funzione per l'hover delle card
function doCardHover(target) {
  const pin = target.querySelector('.pin');
  pin.classList.toggle('hide')
  target.classList.toggle('polaroid-hover')
}

// Funzione che mostra il lightbox popolandone il contenuto
function showLightBox(url, title) {
  domElements.lightBoxImage.innerHTML = `<img src="${url}" alt="${title}" onerror="this.src='${placeHolderPhoto}'">`;
  domElements.lightBox.classList.remove('d-none')
}

// Funzione che nasconde il lightbox
function hideLightBox() {
  domElements.lightBox.classList.add('d-none')
}