/* FUNCION ALTERNAR MODO DIURNO/NOCTURNO */
const darkMode = (darkMode, change) => {
  if (darkMode == 'true') {
    body.classList.add('dark');
    header.classList.add('dark');
    hero.classList.add('dark');
    trendingSuggestion.classList.add('dark');
    results.classList.add('dark');
    moreSearch.classList.add('dark');
    moreFavorites.classList.add('dark');
    moreGifos.classList.add('dark');
    trending.classList.add('dark');
    favorites.classList.add('dark');
    myGifos.classList.add('dark');
    popup.classList.add('dark');
    loader.classList.add('dark');
    gifCreateRecordingZone.classList.add('dark');
    gifCreateTitle.classList.add('dark');
    gifCreateText.classList.add('dark');
    stepOne.classList.add('dark');
    stepTwo.classList.add('dark');
    stepThree.classList.add('dark');
    gifCreateBorder.classList.add('dark');
    btnCreateGifoStart.classList.add('dark');
    btnCreateGifoRecord.classList.add('dark');
    btnCreateGifoEnd.classList.add('dark');
    btnCreateGifoUpload.classList.add('dark');
    repeatShot.classList.add('dark');
    timerRecording.classList.add('dark')
    footer.classList.add('dark');
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      iconSearchGreyHero.src = './assets/images/mic-modo-noc.svg';
    }
    iconSearch.src = './assets/images/icon-search-modo-noct.svg';
    burguer.src = './assets/images/burger-modo-noct.svg';
    iconSearchCloseHero.src = './assets/images/close-modo-noct.svg';
    camaraCuerpo.src = './assets/images/camara-nocturno.svg';
    carreteChico.src = './assets/images/carretechico-nocturno.svg';
    carreteGrande.src = './assets/images/carretegrande-nocturno.svg';
    celuloide.src='./assets/images/pelicula-modo-noc.svg'
    goToDarkMode.lastChild.textContent = 'Modo Diurno';
    if (change) {
      changeDarkMode(true);
    }
  } else {
    body.classList.remove('dark');
    header.classList.remove('dark');
    hero.classList.remove('dark');
    trendingSuggestion.classList.remove('dark');
    results.classList.remove('dark');
    moreSearch.classList.remove('dark');
    moreGifos.classList.remove('dark');
    trending.classList.remove('dark');
    favorites.classList.remove('dark');
    myGifos.classList.remove('dark');
    popup.classList.remove('dark');
    loader.classList.remove('dark');
    gifCreateRecordingZone.classList.remove('dark');
    gifCreateTitle.classList.remove('dark');
    gifCreateText.classList.remove('dark');
    stepOne.classList.remove('dark');
    stepTwo.classList.remove('dark');
    stepThree.classList.remove('dark');
    gifCreateBorder.classList.remove('dark');
    btnCreateGifoStart.classList.remove('dark');
    btnCreateGifoRecord.classList.remove('dark');
    btnCreateGifoEnd.classList.remove('dark');
    btnCreateGifoUpload.classList.remove('dark');
    repeatShot.classList.remove('dark');
    timerRecording.classList.remove('dark')
    footer.classList.remove('dark');
    if (navigator.userAgent.indexOf("Chrome") != -1) {
      iconSearchGreyHero.src = './assets/images/mic.svg';
    }
    iconSearch.src = './assets/images/icon-search.svg';
    burguer.src = './assets/images/burger.svg';
    iconSearchCloseHero.src = './assets/images/close.svg';
    camaraCuerpo.src = './assets/images/camara-diurno.svg';
    carreteChico.src = './assets/images/carretechico-diurno.svg';
    carreteGrande.src = './assets/images/carretegrande-diurno.svg';
    celuloide.src='./assets/images/pelicula.svg'
    goToDarkMode.lastChild.textContent = 'Modo Nocturno';
    if (change) {
      changeDarkMode(false);
    }
  }
};

/* FUNCION AUXILIAR ALTERNAR MODO DIURNO/NOCTURNO */
const changeDarkMode = (value) => {
  localStorage.setItem('darkmode', value);
};

/* CHEQUEO SOBRE QUÉ MODO SE ENCUENTRA SETEADO */
const checkDarkMode = localStorage.getItem('darkmode');
darkMode(checkDarkMode);

/* CREACION DEL MODO DIURNO/NOCTURNO (en caso de no existir) */
if (!localStorage.getItem('darkmode')) {
  localStorage.setItem('darkmode', 'false');
  darkMode('false');
}
