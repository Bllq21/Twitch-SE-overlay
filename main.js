// Define some variables
let counterName; // variable to store the name of the counter
let counterValue = 0; // variable to store the value of the counter
let alertMessage = "A Korok was found"; // configurable alert text
const overlay = document.getElementById("overlay"); // overlay element
const image = document.getElementById("image"); // image element
const mess = document.getElementById("mess"); // message element
const counter = document.getElementById("counter"); // counter element
const images = [ '{{img}}','{{img3}}','{{img2}}','{{img6}}','{{img4}}','{{img5}}','{{img8}}','{{img7}}','{{img9}}' ]; // array of image URLs
let audio = new Audio('{audio}');
// function to show the overlay
function showOverlay() {
  var randomIndex = Math.floor(Math.random() * images.length);
  var randomImage = images[randomIndex];
  mess.textContent = alertMessage;
  counter.textContent = counterValue + " have been found so far";
  image.src = randomImage;
  overlay.style.display = "block";
  setTimeout(hideOverlay, 5000);
  audio.play().catch(function () {
    // Browsers can block autoplay until the widget has user interaction.
  });
}

// function to hide the overlay
function hideOverlay() {
  overlay.style.display = "none";
   setTimeout(function() {
    overlay.style.display = "none";
  }, 500);
}

// Listen for bot counter events using StreamElements API
window.addEventListener('onWidgetLoad', async function(obj) {
  const fieldData = obj.detail.fieldData;
  counterName = fieldData.counterName;
  alertMessage = fieldData.alertMessage || alertMessage;

  const volume = Number(fieldData.audioVolume);
  if (!Number.isNaN(volume)) {
    audio.volume = Math.min(1, Math.max(0, volume / 100));
  }

  const root = document.documentElement;
  if (fieldData.mainTextColor) {
    root.style.setProperty('--main-text-color', fieldData.mainTextColor);
  }
  if (fieldData.mainTextFontName) {
    root.style.setProperty('--main-text-font', '"' + fieldData.mainTextFontName + '", sans-serif');
  }
  if (fieldData.mainTextFontSize) {
    root.style.setProperty('--main-text-size', fieldData.mainTextFontSize + 'px');
  }
  if (fieldData.mainTextFontWeight) {
    root.style.setProperty('--main-text-weight', fieldData.mainTextFontWeight);
  }

  if (counterName) {
    const counter = await SE_API.counters.get(counterName);
    counterValue = counter.value || 0;
    //document.getElementById("counter-amount").innerText = counterValue;
  }
});

// Listen for bot counter events using StreamElements API
window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const data = obj.detail.event;

  // Check if the event type is bot:counter and the counter name is equal to the counterName variable
  if (listener === 'bot:counter' && data.counter === counterName) {
    counterValue = (data.value !== undefined) ? data.value : 0;
    //document.getElementById("counter-amount").innerText = counterValue;
    showOverlay();
    
    console.log("Counter so far: " + counterValue);
  }
});
