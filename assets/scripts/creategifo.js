let recorder;
const getStreamAndRecord = async () => {
  if (recorder) {
    recorder.destroy();
  }
  gifCreateTitle.textContent = '¿Nos das acceso a tu cámara?';
  gifCreateText.textContent = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
  stepOne.classList.add('step-active');
  await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 }
      }
    })
    .then((mediaStreamObj) => {
      btnCreateGifoStart.classList.add('hidden');
      btnCreateGifoRecord.classList.remove('hidden');
      gifCreateTitle.classList.add('hidden');
      gifCreateText.classList.add('hidden');
      video.classList.remove('hidden');
      stepOne.classList.remove('step-active');
      stepTwo.classList.add('step-active');
      video.srcObject = mediaStreamObj;
      video.play();
      recorder = RecordRTC(mediaStreamObj, {
        type: 'gif', frameRate: 1, quality: 10, width: 360, hidden: 240, onGifRecordingStarted: function () { }
      });
    })
    .catch((error) => console.error(error));
};


let timer;
const createGifo = () => {
  btnCreateGifoRecord.classList.add('hidden');
  timerRecording.classList.remove('hidden');
  btnCreateGifoEnd.classList.remove('hidden');
  creargifCamara.classList.add('on-record');
  blobRec.classList.remove('hidden')
  recorder.startRecording();
  timer = setInterval(timerActive, 1000);
};

let form;
let blob;
let hours = '00';
let minutes = '00';
let seconds = '00';
const stopCreatingGif = () => {
  form = new FormData();
  form.delete('file');
  btnCreateGifoEnd.classList.add('hidden');
  btnCreateGifoUpload.classList.remove('hidden');
  video.classList.add('hidden');
  recordedGifo.classList.remove('hidden');
  timerRecording.classList.add('hidden');
  repeatShot.classList.remove('hidden');
  creargifCamara.classList.remove('on-record');
  blobRec.classList.add('hidden')
  repeatShot.addEventListener('click', (e) => {
    e.preventDefault;
    repeatShot.classList.add('hidden');
    recordedGifo.classList.add('hidden');
    btnCreateGifoUpload.classList.add('hidden');
    stepThree.classList.remove('step-active');
    getStreamAndRecord();
  });
  stepTwo.classList.remove('step-active');
  stepThree.classList.add('step-active');
  recorder.stopRecording(() => {
    blob = recorder.getBlob();
    recordedGifo.src = URL.createObjectURL(blob);
    form.append('file', recorder.getBlob(), 'myGif.gif');
  });
  clearInterval(timer);
  hours = '00';
  minutes = '00';
  seconds = '00';
  timerRecording.innerText = `${hours}:${minutes}:${seconds}`;
};

let myGifoId;
const uploadCreatedGif = async () => {
  girCreateOverlayStatusIcon.classList.add('spin')
  girCreateOverlayStatusIcon.src = './assets/images/loader.svg';
  girCreateOverlayStatusText.textContent = 'Estamos subiendo tu GIFO';
  overlay.classList.remove('hidden');
  repeatShot.classList.add('hidden');
  btnCreateGifoUpload.classList.add('hidden');
  /* console.log(form.get('file')); */
  await fetch(endpointUpload + apiKey, {
    method: 'POST',
    body: form,
  })
    .then((response) => response.json())
    .then((myGif) => {
      myGifoId = myGif.data.id;
      let buttonsMyGif = document.createElement('div');
      buttonsMyGif.classList.add('overlay__buttons');
      let buttonDownload = document.createElement('div');
      buttonDownload.setAttribute('class', 'download');
      let buttonLink = document.createElement('div');
      buttonLink.setAttribute('class', 'link');
      buttonsMyGif.appendChild(buttonDownload);
      buttonDownload.addEventListener('click', () => download(myGifoId, 'tuGifo'));
      buttonsMyGif.appendChild(buttonLink);
      buttonLink.addEventListener('click', (e) => {
        let aux = document.createElement("input");
        aux.value = `https://media.giphy.com/media/${myGifoId}/giphy.gif`;
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        alert("Link del Gif Copiado al Portapapeles");
      });
      overlay__buttonscontainer.appendChild(buttonsMyGif);
      girCreateOverlayStatusIcon.classList.remove('spin')
      girCreateOverlayStatusIcon.src = './assets/images/check.svg';
      girCreateOverlayStatusText.textContent = 'GIFO subido con éxito';
      const object = {
        id: myGifoId,
        url: `https://media.giphy.com/media/${myGifoId}/giphy.gif`,
        username: '',
        title: 'Tu gifo'
      };
      let arrayMyGifos = JSON.parse(localStorage.getItem('mygifos'));
      if (!arrayMyGifos) {
        arrayMyGifos = [];
        arrayMyGifos.push(object);
        localStorage.setItem('mygifos', JSON.stringify(arrayMyGifos));
      } else {
        arrayMyGifos.push(object);
        localStorage.setItem('mygifos', JSON.stringify(arrayMyGifos));
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const timerActive = () => {
  seconds++;
  if (seconds < 10) seconds = `0` + seconds;
  if (seconds > 59) {
    seconds = `00`;
    minutes++;
    if (minutes < 10) minutes = `0` + minutes;
  }
  if (minutes > 59) {
    minutes = `00`;
    hours++;
    if (hours < 10) hours = `0` + hours;
  }
  timerRecording.innerHTML = `${hours}:${minutes}:${seconds}`;
};