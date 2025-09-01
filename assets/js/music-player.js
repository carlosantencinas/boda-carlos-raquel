const player = document.getElementById('player');
const songTitle = document.getElementById('song-title');
const playlistItems = document.querySelectorAll('#playlist li');
const randomBtn = document.getElementById('random-btn');

let currentIndex = 0;
let shuffledPlaylist = [];

// Función para barajar canciones (Fisher-Yates shuffle)
function shufflePlaylist() {
  shuffledPlaylist = Array.from(playlistItems);
  for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
  }
  
  // Obtener el último índice reproducido o generar uno aleatorio
  const lastPlayedIndex = localStorage.getItem('lastPlayedIndex');
  const lastPlayedTime = localStorage.getItem('lastPlayedTime');
  const currentTime = new Date().getTime();
  
  // Si ha pasado más de 1 hora desde la última reproducción, o es la primera vez
  if (!lastPlayedIndex || !lastPlayedTime || (currentTime - lastPlayedTime > 3600000)) {
    currentIndex = Math.floor(Math.random() * shuffledPlaylist.length);
  } else {
    // Reproducir la siguiente canción en la lista
    currentIndex = (parseInt(lastPlayedIndex) + 1) % shuffledPlaylist.length;
  }
}

// Reproducir canción
function playSong(index) {
  currentIndex = index;
  const song = shuffledPlaylist[index];
  const src = song.dataset.src;
  player.src = src;
  player.play().catch(error => {
    console.log('La reproducción automática fue prevenida:', error);
  });
  songTitle.textContent = song.textContent;

  // Guardar en localStorage
  localStorage.setItem('lastPlayedIndex', currentIndex);
  localStorage.setItem('lastPlayedTime', new Date().getTime());

  // Actualizar clases
  playlistItems.forEach((item) => item.classList.remove('playing'));
  song.classList.add('playing');
}

// Reproducir al hacer clic en una canción de la lista original
playlistItems.forEach((item) => {
  item.addEventListener('click', () => {
    const index = shuffledPlaylist.indexOf(item);
    if (index !== -1) {
      playSong(index);
    }
  });
});

// Botón de canción aleatoria (nuevo orden aleatorio)
randomBtn.addEventListener('click', () => {
  shufflePlaylist();
  playSong(currentIndex);
});

// Pasar a la siguiente al terminar
player.addEventListener('ended', () => {
  currentIndex++;
  if (currentIndex >= shuffledPlaylist.length) {
    shufflePlaylist(); // vuelve a mezclar para infinito
  }
  playSong(currentIndex);
});

// Inicializar: mezclar y empezar con canción aleatoria
shufflePlaylist();
playSong(currentIndex);
// Inicializar: mezclar playlist
shufflePlaylist();

// En móviles: iniciar al hacer scroll
let musicStarted = false;
document.addEventListener('touchstart', () => {
  if (!musicStarted) {
    playSong(currentIndex);
    musicStarted = true;
  }
}, { once: true });
