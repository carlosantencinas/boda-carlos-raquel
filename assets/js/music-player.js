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
  currentIndex = 0;
}

// Reproducir canción
function playSong(index) {
  currentIndex = index;
  const song = shuffledPlaylist[index];
  const src = song.dataset.src;
  player.src = src;
  player.play();
  songTitle.textContent = song.textContent;

  // Actualizar clases
  playlistItems.forEach((item) => item.classList.remove('playing'));
  song.classList.add('playing');
}

// Reproducir al hacer clic en una canción de la lista original
playlistItems.forEach((item) => {
  item.addEventListener('click', () => {
    const index = shuffledPlaylist.indexOf(item);
    playSong(index);
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

// 🔥 Inicializar: mezclar y empezar aleatorio
shufflePlaylist();
playSong(currentIndex);
