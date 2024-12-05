const endpoint = "https://jsonplaceholder.typicode.com/photos?_limit=6"
/*
Risposta dell'endpoint:
[
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 5,
    "title": "natus nisi omnis corporis facere molestiae rerum in",
    "url": "https://via.placeholder.com/600/f66b97",
    "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  },
  {
    "albumId": 1,
    "id": 6,
    "title": "accusamus ea aliquid et amet sequi nemo",
    "url": "https://via.placeholder.com/600/56a8c2",
    "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
  }
]
*/
const domElements = {
  polaroidWrapper: document.getElementById('polaroid-wrapper'),
  lightBox: document.getElementById('lightbox'),
  lightBoxImage: document.getElementById('lightbox-image-wrapper'),
  lightBoxClose: document.querySelector('#lightbox button')
}

axios.get(endpoint)
  .then(response => {
    printAlbum(response.data);
  })
  .catch(error => {
    console.log(error);
  })

domElements.lightBoxClose.addEventListener('click', () => {
  domElements.lightBox.classList.add('d-none')
})

function printPhoto({ title, thumbnailUrl, url }) {
  const newPhoto = document.createElement('div');
  newPhoto.className = 'polaroid position-relative';
  newPhoto.innerHTML = `
      <div class="pin position-absolute">
        <img src="./assets/img/pin.svg" alt="">
      </div>
      <div class="photo-wrapper">
        <img src="${thumbnailUrl}" alt="example pic">
      </div>
      <div class="photo-caption">
        <p>${title}</p>
      </div>
    `;
  domElements.polaroidWrapper.appendChild(newPhoto);
  newPhoto.addEventListener('mouseenter', el => {
    doCardHover(el.target)
  })

  newPhoto.addEventListener('mouseleave', el => {
    doCardUnhover(el.target)
  })

  newPhoto.addEventListener('click', () => {
    showLightBox(url, title)
  })
}

function printAlbum(photoList) {
  domElements.polaroidWrapper.innerHTML = '';
  photoList.forEach(photo => {
    printPhoto(photo)
  });
}

function doCardHover(target) {
  const pin = target.querySelector('.pin');
  pin.classList.add('d-none')
  target.classList.add('polaroid-hover')
}

function doCardUnhover(target) {
  const pin = target.querySelector('.pin');
  pin.classList.remove('d-none')
  target.classList.remove('polaroid-hover')
}

function showLightBox(url, title) {
  domElements.lightBoxImage.innerHTML = `<img src="${url}" alt="${title}">`;
  domElements.lightBox.classList.remove('d-none')
}