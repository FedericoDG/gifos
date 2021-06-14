/* BUSCIÓN ACTIVAR/DESACTIVAR MENU HAMBURGUESA */
burguer.addEventListener('click', () => {
  burguer.classList.toggle('active');
  menu.classList.toggle('show');
});

/* EVENTO DESPLEGAR BUSCADOR */
searchHero.addEventListener('click', () => {
  iconSearchHero.classList.add('hidden');
  iconSearchGreyHero.classList.remove('hidden');
  iconSearchCloseHero.classList.remove('hidden');
  searchHero.select();
});

/* EVENTO CERRAR BUSCADOR */
iconSearchCloseHero.addEventListener('click', () => {
  searchHero.value = '';
  iconSearchHero.classList.toggle('hidden');
  iconSearchGreyHero.classList.toggle('hidden');
  iconSearchCloseHero.classList.toggle('hidden');
  searchHeroContainer.classList.remove('active');
  searchSuggestion.classList.add('hidden');
});

/* EVENTO IR A HOME */
goToHome.addEventListener('click', () => {
  menuFavorites.classList.remove('menu-active');
  menuMygifos.classList.remove('menu-active');
  menuCreate.classList.remove('menu-active');
  createGifos.classList.add('hidden');
  myGifos.classList.add('hidden');
  favorites.classList.add('hidden');
  hero.classList.remove('hidden');
  trending.classList.remove('hidden');
  results.classList.remove('hidden');
  trendingSuggestion.classList.remove('hidden');
  if (window.innerWidth < 1440) {
    menu.classList.remove('show');
    burguer.classList.remove('active');
  }
  deleteNode(containerGallery);
  searchHero.value = '';
  searchTitle.classList.add('hidden');
  moreSearch.classList.add('hidden');
  iconSearchGreyHero.classList.add('hidden');
  iconSearchCloseHero.classList.add('hidden');
  iconSearchHero.classList.remove('hidden');
  searchSuggestion.classList.add('hidden');
  searchHeroContainer.classList.remove('active');
  noSearchResults.classList.add('hidden');
  onLoad();
});

/* EVENTO MODO DIURNO/NOCTURNO */
goToDarkMode.addEventListener('click', () => {
  const dMode = localStorage.getItem('darkmode');
  if (dMode == 'false') {
    darkMode('true', 'change');
  } else {
    darkMode('false', 'change');
  }
  if (window.innerWidth < 1440) {
    menu.classList.remove('show');
    burguer.classList.remove('active');
  }
  onLoad();
});

/* EVENTO IR A FAVORITOS */
goToFavorites.addEventListener('click', () => {
  menuFavorites.classList.add('menu-active');
  menuMygifos.classList.remove('menu-active');
  menuCreate.classList.remove('menu-active');
  hero.classList.add('hidden');
  myGifos.classList.add('hidden');
  results.classList.add('hidden');
  createGifos.classList.add('hidden');
  favorites.classList.remove('hidden');
  trending.classList.remove('hidden');
  trendingSuggestion.classList.add('hidden');
  deleteNode(containerFavorites);
  if (localStorage.getItem('favorites')) {
    favoritesEmpty.classList.add('hidden');
    if (JSON.parse(localStorage.getItem('favorites')).length > 12) {
      moreFavorites.classList.remove('hidden');
    }
    startFavorites = 0;
    endFavorites = 11;
    renderFavoritesOrMyGifos(JSON.parse(localStorage.getItem('favorites')), startFavorites, endFavorites, containerFavorites);
  }
  else {
    favoritesEmpty.classList.remove('hidden');
    moreFavorites.classList.add('hidden');
  }
  if (window.innerWidth < 1440) {
    menu.classList.remove('show');
    burguer.classList.remove('active');
  }
  onLoad();
});

/* EVENTO IR A MIS GIFOS */
goToMyGifos.addEventListener('click', () => {
  menuFavorites.classList.remove('menu-active');
  menuMygifos.classList.add('menu-active');
  menuCreate.classList.remove('menu-active');
  hero.classList.add('hidden');
  favorites.classList.add('hidden');
  createGifos.classList.add('hidden');
  results.classList.add('hidden');
  trendingSuggestion.classList.add('hidden');
  myGifos.classList.remove('hidden');
  trending.classList.remove('hidden');
  deleteNode(containerMyGifos);
  if (localStorage.getItem('mygifos')) {
    myGifosEmpty.classList.add('hidden');
    if (JSON.parse(localStorage.getItem('mygifos')).length > 12) {
      moreGifos.classList.remove('hidden');
    }
    startMyGifos = 0;
    endMyGifos = 11;
    renderFavoritesOrMyGifos(JSON.parse(localStorage.getItem('mygifos')), startMyGifos, endMyGifos, containerMyGifos);
  }
  else {
    myGifosEmpty.classList.remove('hidden');
    moreGifos.classList.add('hidden');
  }
  if (window.innerWidth < 1440) {
    menu.classList.remove('show');
    burguer.classList.remove('active');
  }
  onLoad();
});

/* EVENTO IR A CREAR GIFOS */
goToCreateGifos.addEventListener('click', () => {
  menuFavorites.classList.remove('menu-active');
  menuMygifos.classList.remove('menu-active');
  menuCreate.classList.add('menu-active');
  hero.classList.add('hidden');
  results.classList.add('hidden');
  trendingSuggestion.classList.add('hidden');
  favorites.classList.add('hidden');
  myGifos.classList.add('hidden');
  trending.classList.add('hidden');
  createGifos.classList.remove('hidden');
  overlay.classList.add('hidden');
  btnCreateGifoStart.classList.remove('hidden');
  btnCreateGifoRecord.classList.add('hidden');
  btnCreateGifoEnd.classList.add('hidden');
  btnCreateGifoUpload.classList.add('hidden');
  stepThree.classList.remove('step-active');
  recordedGifo.classList.add('hidden');
  gifCreateTitle.classList.remove('hidden');
  gifCreateText.classList.remove('hidden');
  video.classList.add('hidden');
  repeatShot.classList.add('hidden');
  if (window.innerWidth < 1440) {
    menu.classList.remove('show');
  }
  deleteNode(overlay__buttonscontainer);
  onLoad();
});

/* EVENTO BUSCADOR */
searchHero.addEventListener('keypress', (e) => {
  searchHeroContainer.classList.add('active');
  searchSuggestion.classList.remove('hidden');
  getSuggestions(searchHero.value);
  if (e.key == 'Enter') {
    searchTitle.textContent = searchHero.value;
    searchTitle.classList.remove('hidden');
    getSearch(searchHero.value);
    searchHeroContainer.classList.remove('active');
    searchSuggestion.classList.add('hidden');
  }
});

/* EVENTO BOTÓN VER MÁS EN BÚSQUEDAS*/
moreSearch.addEventListener('click', (e) => {
  e.preventDefault();
  startSearch += 12;
  endSearch += 12;
  renderSearch(arraySearch, startSearch, endSearch);
  if (endSearch > 50) {
    moreSearch.classList.add('hidden');
  }
});

/* EVENTO MOVER CARRUSEL HACIA LA IZQUIERDA */
arrowLeft.addEventListener('click', moveLeft);

/* EVENTO MOVER CARRUSEL HACIA LA DERECHA */
arrowRight.addEventListener('click', moveRight);

window.addEventListener('scroll', () => {
  let header = document.querySelector('header');
  header.classList.toggle("sticky", window.scrollY > 100);
});

/* EVENTO BOTÓN VER MÁS EN BÚSQUEDAS*/
moreFavorites.addEventListener('click', (e) => {
  e.preventDefault();
  startFavorites += 12;
  endFavorites += 12;
  renderFavoritesOrMyGifos(JSON.parse(localStorage.getItem('favorites')), startFavorites, endFavorites, containerFavorites);
  if (endFavorites > JSON.parse(localStorage.getItem('favorites')).length) {
    moreFavorites.classList.add('hidden');
  }
});

/* EVENTO BOTÓN VER MÁS EN MIS GIFOS*/
moreGifos.addEventListener('click', (e) => {
  e.preventDefault();
  startMyGifos += 12;
  endMyGifos += 12;
  renderFavoritesOrMyGifos(JSON.parse(localStorage.getItem('mygifos')), startMyGifos, endMyGifos, containerMyGifos);
  if (endMyGifos > JSON.parse(localStorage.getItem('mygifos')).length) {
    moreGifos.classList.add('hidden');
  }
});

/* EVENTO CREAR GIFO - BOTÓN OBTENER PERMISOS */
btnCreateGifoStart.addEventListener('click', () => {
  getStreamAndRecord();
  btnCreateGifoStart.removeEventListener('click', () => getStreamAndRecord());
});

/* EVENTO CREAR GIFO - BOTÓN COMENZAR A GRABAR */
btnCreateGifoRecord.addEventListener('click', () => {
  createGifo();
  btnCreateGifoRecord.removeEventListener('click', () => createGifo());
});

/* EVENTO CREAR GIFO - BOTÓN PARA DE GRABAR */
btnCreateGifoEnd.addEventListener('click', () => {
  stopCreatingGif();
  btnCreateGifoEnd.removeEventListener('click', () => stopCreatingGif());
});

/* EVENTO CREAR GIFO - BOTÓN SUBIR*/
btnCreateGifoUpload.addEventListener('click', () => {
  uploadCreatedGif();
  btnCreateGifoUpload.removeEventListener('click', () => uploadCreatedGif());
});
