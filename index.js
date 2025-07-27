const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

let isEditMode = false;
let drawing = false;

// Adapter le canvas à la taille de l'écran
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  redrawSaved();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Recharger le dessin depuis le localStorage
function redrawSaved() {
  const saved = localStorage.getItem('leobidaniDrawing');
  if (saved) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = saved;
  }
}

// Sauvegarder le dessin dans le localStorage
function saveDrawing() {
  localStorage.setItem('leobidaniDrawing', canvas.toDataURL());
}

// Vider le dessin
function clearDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem('leobidaniDrawing');
  console.log("Dessin effacé");
}

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
  // Touche D : activer/désactiver le mode édition
  if (e.key === 'd') {
    isEditMode = !isEditMode;
    document.body.classList.toggle('edit-mode', isEditMode);
    console.log("Edit mode:", isEditMode);
  }

  // Touche E : effacer le dessin
  if (e.key === 'e' && isEditMode) {
    clearDrawing();
  }
});

// Dessin à la souris
canvas.addEventListener('mousedown', (e) => {
  if (!isEditMode) return;
  drawing = true;
  draw(e);
});

canvas.addEventListener('mouseup', () => {
  if (!isEditMode) return;
  drawing = false;
  saveDrawing();
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing || !isEditMode) return;
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 2, 0, Math.PI * 2);
  ctx.fill();
}
