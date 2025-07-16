let song;
let fft;
let playButton;
let volumeControl;
let playing = false;

function preload() {
    song = loadSound('assets/me-llama-momo.mp3'); // Cambia el nombre por tu canción
}

function setup() {
    let canvas = createCanvas(400, 200);
    canvas.parent('musicBox');
    
    // Obtener elementos
    playButton = select('#playButton');
    volumeControl = select('#volumeControl');
    
    // Configurar eventos
    playButton.mousePressed(togglePlay);
    volumeControl.input(updateVolume);
    
    // Configurar FFT
    fft = new p5.FFT();
    fft.setInput(song);
    
    // Establecer volumen inicial
    updateVolume();
}

function draw() {
    background(240);
    let spectrum = fft.analyze();
    noStroke();
    for (let i = 0; i < spectrum.length; i += 10) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = map(spectrum[i], 0, 255, 0, height);
        fill(random(100, 255), random(100, 255), random(100, 255));
        rect(x, height - h, width / 64, h);
    }
}

function togglePlay() {
    if (playing) {
        song.pause();
        playButton.html('▶️ Reproducir');
    } else {
        song.loop();
        playButton.html('⏸️ Pausar');
    }
    playing = !playing;
}

function updateVolume() {
    // Convertir el valor del slider (0-100) a un valor de volumen (0-1)
    let volume = volumeControl.value() / 100;
    if (song) {
        song.setVolume(volume);
    }
}
