// Inizializzo un array in cui inserirò le foto ricevute dalla chiamata API
let photos = [];

// Includo in un oggetto gli elementi che mi serviranno nello script
const domElements = {
  polaroidWrapper: document.getElementById('polaroid-wrapper'),
  lightBox: document.getElementById('lightbox'),
  lightBoxImage: document.getElementById('lightbox-image-wrapper'),
  lightBoxClose: document.querySelector('#lightbox button'),
}

// Dichiaro l'endpoint e le variabili utili al funzionamento del codice
const endpoint = "https://jsonplaceholder.typicode.com/photos?_limit=144";

// Triggero la chiamata AJAX all'API fornita
axios.get(endpoint)
  //Alla ricezione della risposta, inserisco la risposta nell'array di foto e triggero la funzione che le gestirà
  .then(response => {
    photos = response.data;
    displayMorePhotos();
  })
  //In caso di errore da parte della API, stampo l'errore in console
  .catch(error => {
    console.log(error);
  });


// Controllo l'altezza di scorrimento della pagina per triggerare la funzione che mostra altre foto quando la pagina sta terminando
const mainWrap = document.getElementById('main-wrapper');
mainWrap.addEventListener('scroll', () => {
  if (mainWrap.scrollTop + mainWrap.clientHeight >= mainWrap.scrollHeight - 500 && !isLoading) {
    displayMorePhotos();
  }
});

// Attribuisco la funzione di chiusura del lightbox al bottone "Chiudi"
domElements.lightBoxClose.addEventListener('click', hideLightBox)