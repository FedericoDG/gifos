if (navigator.userAgent.indexOf("Chrome") != -1) {
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();

  iconSearchGreyHero.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onstart = () => {
    searchHero.value = 'Estamos grabando tu voz...';
  };

  recognition.onresult = (e) => {
    let voz = e.results[0][0].transcript;
    searchHero.value = voz;
    searchTitle.textContent = searchHero.value;
    searchTitle.classList.remove('hidden');
    searchHeroContainer.classList.remove('active');
    searchSuggestion.classList.add('hidden');
    getSearch(voz);
  };
}