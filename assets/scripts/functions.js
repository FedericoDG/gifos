/* FUNCION HAY BUSQUEDA ACTIVA (MUESTRA SUGERENCIAS) */
const searchActive = () => {
  searchContainer.classList.add('active');
  searchSuggestion.classList.remove('hidden');
};

/* FUNCION NO HAY BUSQUEDA ACTIVA (NO MUESTRA SUGERENCIAS) */
const searchInactive = () => {
  searchContainer.classList.remove('active');
  searchSuggestion.classList.add('hidden');
};

/* FUNCIÓN OBTENER SUGERENCIAS AL BUSCAR */
const getTrendingSearches = async (amount) => {
  try {
    const response = await fetch(endpointTrendingSearches + apiKey);
    const data = await response.json();
    renderTrendingSearches(data.data.slice(0, amount));
  } catch (error) {
    console.error(error);
  }
};

/* FUNCIÓN RENDERIZAR SUGERENCIAS AL BUSCAR */
const renderTrendingSearches = (data) => {
  const fragment = new DocumentFragment();
  data.forEach(element => {
    const span = document.createElement('span');
    span.setAttribute('class', 'trendingsugg__content-trend');
    span.textContent = element;
    fragment.appendChild(span);
    span.addEventListener('click', () => {
      searchHero.value = element;
      getSearch(element);
      searchTitle.textContent = element;
      searchTitle.classList.remove('hidden');
    });
  });
  trendingSuggestionContainer.appendChild(fragment);
};

/* FUNCIÓN BUSCAR */
let startSearch = 0;
let endSearch = 0;
let arraySearch = [];
const getSearch = async (string) => {
  startSearch = 0;
  endSearch = 11;
  try {
    const response = await fetch(endpointSearch + apiKey + '&q=' + string);
    const data = await response.json();
    deleteNode(containerGallery);
    if (data.data.length < 12) {
      noResults();
      moreSearch.classList.add('hidden');
      results.scrollIntoView();
      return;
    } else {
      if (arraySearch.length === 0) {
        data.data.forEach(element => {
          arraySearch.push(element);
        });
      } else {
        arraySearch = [];
        data.data.forEach(element => {
          arraySearch.push(element);
        });
      }
      hasResults();
      renderSearch(arraySearch, startSearch, endSearch);
      moreSearch.classList.remove('hidden');
      results.scrollIntoView();
    }
  } catch (error) {
    console.error(error);
  }
};

/* FUNCIÓN RENDERIZAR BÚSQUEDA */
const renderSearch = (array, start, end) => {
  const fragment = new DocumentFragment();
  for (let index = start; index < array.length; index++) {
    if (index <= end) {
      const divContainer = document.createElement('div');
      divContainer.setAttribute('class', 'results__gallery-item');
      fragment.appendChild(divContainer);

      divContainer.addEventListener('mouseenter', () => addGreyScaleToSiblings(divContainer));
      divContainer.addEventListener('mouseleave', () => removeGreyScaleToSiblings(divContainer));

      const image = document.createElement('img');
      image.setAttribute('class', 'image');
      image.setAttribute('id', array[index].id); // ??? BORRAR ???
      image.setAttribute('src', array[index].images.original.url);
      image.setAttribute('alt', array[index].title);
      fragment.children[0].appendChild(image);
      /*  */
      image.addEventListener('click', () => max(image.id, array[index].images.original.url, array[index].username, array[index].title, 'search'));

      const divActions = document.createElement('div');
      divActions.setAttribute('class', 'actions');
      fragment.children[0].appendChild(divActions);

      const divActionsButtons = document.createElement('div');
      divActionsButtons.setAttribute('class', 'actions__buttons');

      const divFav = document.createElement('div');
      const LS = JSON.parse(localStorage.getItem('favorites')) || [];
      favoriteExist = LS.filter(element => element.id == array[index].id);
      if (favoriteExist.length > 0) {
        divFav.setAttribute('class', 'fav-act');
      } else {
        divFav.setAttribute('class', 'fav');
      }
      divActionsButtons.appendChild(divFav);
      /*  */
      divFav.addEventListener('click', () => {
        divFav.classList.add('fav-act');
        addFavorites(image.id, array[index].images.original.url, array[index].username, array[index].title);
      });

      const divDownload = document.createElement('div');
      divDownload.setAttribute('class', 'download');
      divActionsButtons.appendChild(divDownload);
      /*  */
      divDownload.addEventListener('click', () => download(array[index].id, array[index].title));

      const divMax = document.createElement('div');
      divMax.setAttribute('class', 'max');
      divActionsButtons.appendChild(divMax);
      /*  */
      divMax.addEventListener('click', () => max(image.id, array[index].images.original.url, array[index].username, array[index].title, 'search'));

      fragment.children[0].lastChild.appendChild(divActionsButtons);

      const divActionsDetails = document.createElement('div');
      divActionsDetails.setAttribute('class', 'actions__details');

      const divActionsDetails_user = document.createElement('div');
      divActionsDetails_user.setAttribute('class', 'actions__details-user');
      const user = document.createElement('p');
      user.textContent = array[index].username;
      divActionsDetails_user.appendChild(user);
      divActionsDetails.appendChild(divActionsDetails_user);

      const divActionsDetails_title = document.createElement('div');
      divActionsDetails_title.setAttribute('class', 'actions__details-title');
      const title = document.createElement('p');
      title.textContent = array[index].title;
      divActionsDetails_title.appendChild(title);
      divActionsDetails.appendChild(divActionsDetails_title);
      fragment.children[0].lastChild.appendChild(divActionsDetails);
    }
    containerGallery.appendChild(fragment);
  }
};

/* FUNCIÓN OBTENER Y RENDERIZAR TRENDING SUGERIDOS */
const getSuggestions = async (string) => {
  const response = await fetch(endpointSuggestions + '{' + string + '}' + '?api_key=' + apiKey);
  const data = await response.json();
  if (data.data.length > 0) {
    deleteNode(suggestion);
    try {
      const fragment = new DocumentFragment();
      for (let index = 0; index < 5; index++) {
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.setAttribute('src', './assets/images/icon-search-grey.svg');
        image.setAttribute('alt', 'lupa');
        li.appendChild(image);
        const span = document.createElement('span');
        span.textContent = data.data[index].name;
        li.appendChild(span);
        span.addEventListener('click', () => {
          getSearch(span.textContent);
          searchHero.value = span.textContent;
          searchHeroContainer.classList.remove('active');
          searchSuggestion.classList.add('hidden');
          searchTitle.textContent = span.textContent;
          searchTitle.classList.remove('hidden');
        });
        fragment.append(li);
      }
      suggestion.appendChild(fragment);
    } catch (error) {
      console.error(error);
    }
  }
};

/* FUNCIÓN OBTENER TRENDING ("CARRUSEL") */
let arrayTrending = [];
const getTrending = async () => {
  if (arrayTrending.length > 0) {
    arrayTrending = [];
  }
  try {
    const response = await fetch(endpointTrending + apiKey);
    const data = await response.json();
    for (let index = 0; index < 10; index++) {
      let object = {
        id: data.data[index].id,
        url: data.data[index].images.original.url,
        username: data.data[index].username,
        title: data.data[index].title
      };
      arrayTrending.push(object);
    }
    deleteNode(trendingContainer);
    renderTrending(arrayTrending);
  } catch (error) {
    console.error(error);
  }
};

/* FUNCIÓN RENDERIZAR TRENDING ("CARRUSEL") */
const renderTrending = (array) => {
  const fragment = new DocumentFragment;
  array.forEach(element => {
    const divItem = document.createElement('div');
    divItem.setAttribute('class', 'item');
    const image = document.createElement('img');
    image.setAttribute('class', 'image');
    image.setAttribute('id', element.id);
    image.setAttribute('src', element.url);
    image.setAttribute('alt', element.title);
    divItem.appendChild(image);
    image.addEventListener('click', () => max(element.id, element.url, element.username, element.title, 'search'));
    const divActions = document.createElement('div');
    divActions.setAttribute('class', 'actions');
    const divActionsButtons = document.createElement('div');
    divActionsButtons.setAttribute('class', 'actions__buttons');
    const divFav = document.createElement('div');
    const LS = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteExist = LS.filter(el => el.id == element.id);
    if (favoriteExist.length > 0) {
      divFav.setAttribute('class', 'fav-act');
    } else {
      divFav.setAttribute('class', 'fav');
    }
    const divDownload = document.createElement('div');
    divDownload.setAttribute('class', 'download');
    const divMax = document.createElement('div');
    divMax.setAttribute('class', 'max');
    divActionsButtons.appendChild(divFav);
    divFav.addEventListener('click', () => {
      divFav.classList.add('fav-act');
      addFavorites(element.id, element.url, element.username, element.title);
      if (!favorites.classList.contains('hidden')) {
        eventFire(goToFavorites, 'click');
      }
    });
    divActionsButtons.appendChild(divDownload);
    divDownload.addEventListener('click', () => download(element.id, element.title));
    divActionsButtons.appendChild(divMax);
    divMax.addEventListener('click', () => max(element.id, element.url, element.username, element.title, 'search'));
    divActions.appendChild(divActionsButtons);
    divItem.appendChild(divActions);
    const divActionsDetails = document.createElement('div');
    divActionsDetails.setAttribute('class', 'actions__details');
    const divActionsDetailsUser = document.createElement('div');
    divActionsDetailsUser.setAttribute('class', 'actions__details-user');/*  */
    const pUser = document.createElement('p');
    pUser.textContent = element.username;
    divActionsDetailsUser.appendChild(pUser);
    divActionsDetails.appendChild(divActionsDetailsUser);
    const divActionsDetailsTitle = document.createElement('div');
    divActionsDetailsTitle.setAttribute('class', 'actions__details-title');
    const pTitle = document.createElement('p');
    pTitle.textContent = element.title;
    divActionsDetailsTitle.appendChild(pTitle);
    divActionsDetails.appendChild(divActionsDetailsTitle);
    divActions.appendChild(divActionsDetails);
    divItem.appendChild(divActions);
    fragment.appendChild(divItem);
  });
  trendingContainer.appendChild(fragment);
};

/* OBTENER Y RENDERIZAR FAVORITOS o MIS GIFOS */
let startFavorites = 0;
let endFavorites = 11;
let startMyGifos = 0;
let endMyGifos = 11;
const renderFavoritesOrMyGifos = (array, start, end, node) => {
  const fragment = new DocumentFragment();
  for (let index = start; index < array.length; index++) {
    if (index <= end) {
      const divGalleryItem = document.createElement('div');
      divGalleryItem.setAttribute('class', 'gallery-item');
      divGalleryItem.setAttribute('id', array[index].id);
      const image = document.createElement('img');
      image.setAttribute('class', 'image');
      /* image.setAttribute('id', array[index].id); */
      image.setAttribute('src', array[index].url);
      image.setAttribute('alt', array[index].title);
      divGalleryItem.appendChild(image);
      image.addEventListener('click', () => max(array[index].id, array[index].url, array[index].username, array[index].title, 'favorite'));
      const divActions = document.createElement('div');
      divActions.setAttribute('class', 'actions');
      const divActionsButtons = document.createElement('div');
      divActionsButtons.setAttribute('class', 'actions__buttons');
      const divDelete = document.createElement('div');
      divDelete.setAttribute('class', 'delete');
      divActionsButtons.appendChild(divDelete);
      divDelete.addEventListener('click', () => {
        if (node == containerFavorites) {
          deleteFav(array[index].id);
          if (!favorites.classList.contains('hidden')) {
            deleteNode(trendingContainer);
            getTrending();
          }
        } else {
          deleteMyGifos(array[index].id);
        }
      });
      const divDownload = document.createElement('div');
      divDownload.setAttribute('class', 'download');
      divActionsButtons.appendChild(divDownload);
      divDownload.addEventListener('click', () => download(array[index].id, array[index].title));
      const divMax = document.createElement('div');
      divMax.setAttribute('class', 'max');
      divActionsButtons.appendChild(divMax);
      divMax.addEventListener('click', () => max(array[index].id, array[index].url, array[index].username, array[index].title, 'favorite'));
      divActions.appendChild(divActionsButtons);
      const divDetails = document.createElement('div');
      divDetails.setAttribute('class', 'actions__details');
      const divDetailsUser = document.createElement('div');
      divDetailsUser.setAttribute('class', 'actions__details-user');
      const pUser = document.createElement('p');
      pUser.textContent = array[index].username;
      divDetailsUser.appendChild(pUser);
      divDetails.appendChild(divDetailsUser);
      const divDetailsTitle = document.createElement('div');
      divDetailsTitle.setAttribute('class', 'actions__details-title');
      const pTitle = document.createElement('p');
      pTitle.textContent = array[index].title;
      divDetailsTitle.appendChild(pTitle);
      divDetails.appendChild(divDetailsTitle);
      divActions.appendChild(divActionsButtons);
      divActions.appendChild(divDetails);
      divGalleryItem.appendChild(divActions);
      fragment.appendChild(divGalleryItem);
      divGalleryItem.addEventListener('mouseenter', () => addGreyScaleToSiblings(divGalleryItem));
      divGalleryItem.addEventListener('mouseleave', () => removeGreyScaleToSiblings(divGalleryItem));
    }
  }
  node.appendChild(fragment);
};

/* FUNCIÓN POPUP */
const max = (id, url, username, title, type) => {
  deleteNode(popupClose);
  const close = document.createElement('img');
  close.setAttribute('class', 'close');
  close.setAttribute('alt', 'cerrar');
  close.setAttribute('id', 'close--popup');
  const darkMode = localStorage.getItem('darkmode');
  if (darkMode == 'true') {
    close.setAttribute('src', './assets/images/close-modo-noct.svg');
  } else {
    close.setAttribute('src', './assets/images/close.svg');
  }
  popupClose.appendChild(close);
  const LS = JSON.parse(localStorage.getItem('favorites')) || [];
  favoriteExist = LS.filter(element => element.id == id);
  close.addEventListener('click', () => {
    popupCloseFunction(id, favoriteExist.length);
  });
  document.getElementById('body').classList.add('overflow');
  popup.classList.remove('hidden');
  imageMax.id = id;
  imageMax.src = url;
  imageMax.alt = title;
  popupUser.textContent = username;
  popupTitle.textContent = title;
  if (type == 'search') {
    let addFavoritesPopup = document.createElement('div');
    if (favoriteExist.length > 0) {
      addFavoritesPopup.setAttribute('class', 'addfavorite-act');
    } else {
      addFavoritesPopup.setAttribute('class', 'addfavorite');
    }
    actionsPopup.appendChild(addFavoritesPopup);
    addFavoritesPopup.addEventListener('click', () => {
      addFavoritesPopup.setAttribute('class', 'addfavorite-act');
      addFavorites(id, url, username, title);
    });
  } else {
    let removeFavoritesPopup = document.createElement('div');
    removeFavoritesPopup.setAttribute('class', 'remove');
    actionsPopup.appendChild(removeFavoritesPopup);
    removeFavoritesPopup.addEventListener('click', () => {
      if (title != 'Tu gifo') {
        deleteNode(trendingContainer);
        getTrending();
        deleteFav(id);
        popupCloseFunction(id);
      } else {
        deleteMyGifos(id);
        popup.classList.add('hidden');
        document.getElementById('body').classList.remove('overflow');
        deleteNode(actionsPopup);
        eventFire(goToMyGifos, 'click');
      }
    });
  }
  let downloadPopup = document.createElement('div');
  downloadPopup.setAttribute('class', 'download');
  actionsPopup.appendChild(downloadPopup);
  downloadPopup.addEventListener('click', () => download(id, title));
};

/* FUNCIÓN CERRAR POPUP */
const popupCloseFunction = (id, existFavorite) => {
  if (favorites.classList.contains('hidden') && myGifos.classList.contains('hidden')) {/*  */
    if (document.querySelector('.addfavorite-act')) {
      // Que Alá me me ayude!!!!
      document.getElementById(id).nextElementSibling.firstChild.firstChild.classList.add('fav-act');
    }
  } else {
    let LS = JSON.parse(localStorage.getItem('favorites')) || [];
    LS = LS.filter(el => el.id == id);
    if (existFavorite === 0 && LS.length > 0) {
      if (myGifos.classList.contains('hidden')) {
        deleteNode(trendingContainer);
        getTrending();
        eventFire(goToFavorites, 'click');
      }
    }
  }
  popup.classList.add('hidden');
  document.getElementById('body').classList.remove('overflow');
  deleteNode(actionsPopup);
};

/* FUNCIÓN AGREGAR A FAVORITOS*/
const addFavorites = (id, url, username, title) => {
  let LS = JSON.parse(localStorage.getItem('favorites'));
  if (LS !== null && LS.length > 0) {
    const exist = LS.filter(element => element.id == id);
    if (exist.length == 1) {
    } else {
      const favorite = {
        id: id,
        url: url,
        username: username,
        title: title
      };
      LS.push(favorite);
      localStorage.setItem('favorites', JSON.stringify(LS));
    }
  } else {
    const LS = [];
    const favorite = {
      id,
      url,
      username,
      title
    };
    LS.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(LS));
  }
};

/* FUNCIÓN ELIMINAR FAVORITO */
const deleteFav = (id) => {
  const LS = JSON.parse(localStorage.getItem('favorites'));
  LS.filter((el, index) => {
    if (el.id == id) {
      LS.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(LS));
      if (JSON.parse(localStorage.getItem('favorites')).length == 0) {
        localStorage.removeItem('favorites');
        eventFire(goToFavorites, 'click');
      }
      if (localStorage.getItem('favorites')) {
        deleteElement(document.getElementById(id));
      };
    };
  });
};

/* FUNCIÓN ELIMINAR MI GIFOS */
const deleteMyGifos = (id) => {
  const LS = JSON.parse(localStorage.getItem('mygifos'));
  LS.filter((el, index) => {
    if (el.id == id) {
      LS.splice(index, 1);
      localStorage.setItem('mygifos', JSON.stringify(LS));
      if (JSON.parse(localStorage.getItem('mygifos')).length == 0) {
        localStorage.removeItem('mygifos');
        eventFire(goToMyGifos, 'click');
      }
      if (localStorage.getItem('mygifos')) {
        deleteElement(document.getElementById(id));
        eventFire(goToMyGifos, 'click');
      };
    };
  });
};

/* FUNCIÓN DESCARGAR GIF */
const download = async (id, title) => {
  let a = document.createElement('a');
  try {
    let response = await fetch(`https://media.giphy.com/media/${id}/giphy.gif`);
    let file = await response.blob();
    a.download = title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  } catch (error) {
    console.error(error);
  }
};

/* FUNCIÓN NO HAY FAVORITOS/MIS GIFOS */
const noResults = () => noSearchResults.classList.remove('hidden');

/* FUNCIÓN HAY FAVORITOS/MIS GIFOS */
const hasResults = () => noSearchResults.classList.add('hidden');

/* FUNCION BORRAR UN NODO COMPLETO */
const deleteNode = (node) => {
  while (node.lastChild) {
    node.lastChild.remove();
  }
};

/* FUNCIÓN BORRAR UN ELEMENTO */
const deleteElement = (element) => {
  element.remove();
  eventFire(goToFavorites, 'click');
};

/* FUNCIÓN SIMULAR UN EVENTO */
const eventFire = (el, eventType) => {
  if (el.fireEvent) {
    el.fireEvent('on' + eventType);
  } else {
    const evObject = document.createEvent('Events');
    evObject.initEvent(eventType, true, false);
    el.dispatchEvent(evObject);
  }
};

/* FUNCIÓN MOVER A LA DERECHA EL CARRUSEL */
const moveRight = () => {
  trendingContainer.scrollLeft += 400;
};

/* FUNCIÓN MOVER A LA IZQUIERDA EL CARRUSEL */
const moveLeft = () => {
  trendingContainer.scrollLeft -= 400;
};

/* FUNCIÓN ANIMACIÓN */
const onLoad = () => {
  loader.classList.remove('hidden');
  location.href = "#main";
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 750);
};

/* FUNCIÓN PARA DAR GRIS A LOS ELEMENTOS HERMANOS EN LAS GALERÍAS */
const addGreyScaleToSiblings = (node) => {
  let siblings = [];
  let sibling = node.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== node) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  siblings.forEach(el => el.classList.add('grey'));
};

/* FUNCIÓN PARA QUITAR GRIS A LOS ELEMENTOS HERMANOS EN LAS GALERÍAS */
const removeGreyScaleToSiblings = (node) => {
  let siblings = [];
  let sibling = node.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== node) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  siblings.forEach(el => el.classList.remove('grey'));
};

onLoad(); // Lanzo la animación al cargar la página .
getTrending(); // Obtiene las imágenes del carusell y las renderiza.
getTrendingSearches(6); // Seis sugerencias al buscar.