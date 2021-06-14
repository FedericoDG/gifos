/* RELACIONADO A LOS ENDPOINT */
const apiKey = 'cPNxOjkiEBAaswkVVvd3V9iLYecTWiTA';
const endpointTrendingSearches = 'https://api.giphy.com/v1/trending/searches?api_key=';
const endpointSearch = 'https://api.giphy.com/v1/gifs/search?api_key=';
const endpointSuggestions = 'https://api.giphy.com/v1/tags/related/';
const endpointTrending = 'https://api.giphy.com/v1/gifs/trending?api_key=';
const endpointUpload = 'https://upload.giphy.com/v1/gifs?api_key=';

/* MENÚ Y HAMBURGUESA */
const burguer = document.querySelector('.navbar__burguer');
const menu = document.querySelector('.navbar__list');
const menuFavorites = document.getElementById('menu-favorites');
const menuMygifos = document.getElementById('menu-mygifos');
const menuCreate = document.getElementById('menu-create');
const goToHome = document.querySelector('.logo');
const goToFavorites = document.getElementById('goto-favorites');
const goToMyGifos = document.getElementById('goto-my-gifos');
const goToCreateGifos = document.getElementById('goto-create-gifos');


/* HERO Y BUSCADOR */
const hero = document.querySelector('.heading');
const searchHeroContainer = document.querySelector('.heading__search-container');
const searchContainer = document.querySelector('.heading__search-container');
const searchHero = document.querySelector('.heading__search-container_input');
const iconSearchGreyHero = document.querySelector('.heading__search-container_icon-search-grey');
const iconSearchCloseHero = document.getElementById('icon-search-hero');
const iconSearchHero = document.querySelector('.heading__search-container_icon-search');
const searchSuggestion = document.querySelector('.heading__search-suggestion');
const suggestion = document.getElementById('suggestion');

/* SUGERENCIAS TRENDING */
const trendingSuggestion = document.querySelector('.trendingsugg');

/* RESULTADOS DE BÚSQUEDA */
const results = document.querySelector('.results');
const btnViewMore = document.querySelector('.button');
const noSearchResults = document.querySelector('.results__nofav');
const containerGallery = document.querySelector('.results__gallery');

/* FAVORITOS, MIS GIFOS, CREAR GIFO */
const favorites = document.querySelector('.favorites');
const favoritesEmpty = document.querySelector('.favorites__container-nofav');
const containerFavorites = document.querySelector('.favorites__container-gallery');
const containerMyGifos = document.querySelector('.mygifos__container-gallery');
const moreFavorites = document.getElementById('moreFavorites');
const myGifos = document.querySelector('.mygifos');
const myGifosEmpty = document.querySelector('.mygifos__container-nofav');

/* SUGERENCIAS DE TRENDING */
const trendingSuggestionContainer = document.querySelector('.trendingsugg__content');
const searchTitle = document.querySelector('.results__title');
const moreSearch = document.getElementById('moreSearch');

/* POPUP */
const popup = document.querySelector('.gifpopup');
const popupClose = document.querySelector('.gifpopup__close');
const popupUser = document.querySelector('.gif_user');
const popupTitle = document.querySelector('.gif_title');
const imageMax = document.getElementById('image-max');
const actionsPopup = document.querySelector('.actions2');

/* TRENDING CARRUSEL */
const trending = document.querySelector('.trending');
const trendingContainer = document.querySelector('.trending__container-slider');
const arrowLeft = document.querySelector('.trending__container-left');
const arrowRight = document.querySelector('.trending__container-right');

/* MODO DIURNO/NOCTURNO */
const goToDarkMode = document.getElementById('goto-dark');
const body = document.getElementById('body');
const moreGifos = document.getElementById('moreGifos');
const footer = document.querySelector('.footer');
const iconSearch = document.getElementById('icon-search');
const gifCreateBorder = document.querySelector('.border');

/* CREAR GIFO */
const createGifos = document.querySelector('.creargif');
const gifCreateTitle = document.getElementById('crearGif_title');
const gifCreateText = document.getElementById('crearGif_text');
const gifCreateOverlay = document.getElementById('overlay');
const overlay__buttonscontainer = document.querySelector('.overlay__buttons-container');
const girCreateOverlayStatusIcon = document.getElementById('overlay_status-icon');
const girCreateOverlayStatusText = document.getElementById('overlay_status-text');
const gifCreateRecordingZone = document.querySelector('.creargif__recordingZone');
const video = document.getElementById('recording_video');
const recordedGifo = document.getElementById('recorded_gifo');
const timerRecording = document.getElementById('timer-recording');
const repeatShot = document.getElementById('repeatShot');
const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');
const btnCreateGifoStart = document.getElementById('button-comenzar');
const btnCreateGifoRecord = document.getElementById('button-grabar');
const btnCreateGifoEnd = document.getElementById('button-finalizar');
const btnCreateGifoUpload = document.getElementById('button-subirGif');
const creargifCamara = document.querySelector('.creargif__camara');
const camaraCuerpo = document.querySelector('.camara');
const carreteChico = document.querySelector('.carrete-chico');
const carreteGrande = document.querySelector('.carrete-grande');
const celuloide = document.getElementById('celuloide');
const blobRec = document.querySelector('.blob');

/* OTRAS */
const header = document.getElementById('header');
const loader = document.querySelector('.loader');


