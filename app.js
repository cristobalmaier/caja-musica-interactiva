// Variables globales
let volume = 0.75;
let speed = 1;
let brightness = 0.5;

// Obtener elementos del DOM
const playButton = document.getElementById('playButton');
const volumeSlider = document.getElementById('volumeSlider');
const speedSlider = document.getElementById('speedSlider');
const brightnessSlider = document.getElementById('brightnessSlider');

// Configurar eventos de los sliders
volumeSlider.addEventListener('input', (e) => {
    volume = e.target.value / 100;
    if (song) song.setVolume(volume);
});

speedSlider.addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
    if (song) song.rate(speed);
});

brightnessSlider.addEventListener('input', (e) => {
    brightness = e.target.value / 100;
});

// Funciones de control
playButton.addEventListener('click', () => {
    if (!song.isPlaying()) {
        song.play();
        playButton.textContent = 'Pausar';
    } else {
        song.pause();
        playButton.textContent = 'Reproducir';
    }
});

// Función para actualizar el brillo de la caja de música
function updateMusicBoxBrightness() {
    const musicBox = document.getElementById('musicBox');
    musicBox.style.filter = `brightness(${brightness * 1.5})`;
}

// Actualizar el brillo cada vez que cambie
setInterval(updateMusicBoxBrightness, 100);
