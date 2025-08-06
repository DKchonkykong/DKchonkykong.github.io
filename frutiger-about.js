// Get the canvas and its 2D context
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let time = 0;

//gradiants and how big, frequent, and the speed of animation for the waves
const waves = [
    {
    amplitude: 50,       
    frequency: 0.006,    
    speed: 0.06,         

    gradientStartColor: 'rgba(0, 208, 255, 1)', // test colour white
    gradientEndColor: 'rgba(9, 9, 121, 0.3)',   // test colours blue
  },
  {
    amplitude: 40,
    frequency: 0.002,
    speed: 0.05,
    gradientStartColor: 'rgba(100, 0, 200, 0.7)', // Deeper purple with transparency
    gradientEndColor: 'rgba(200, 0, 100, 0.5)',   // A different shade of pink
  },
  {
    amplitude: 20,
    frequency: 0.005,
    speed: 0.04,
    gradientStartColor: 'rgba(50, 0, 150, 0.7)',  // Another purple shade
    gradientEndColor: 'rgba(150, 0, 50, 0.5)',    // Another pink shade
  }
];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

// Initial canvas setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// The main animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  time += 0.01;

  waves.forEach((wave, index) => {
    
    const gradient = ctx.createLinearGradient(0, height * 0.55 + index * 20, 0, height);
    
    gradient.addColorStop(0, wave.gradientStartColor);
    gradient.addColorStop(1, wave.gradientEndColor);

    ctx.beginPath();
    
    const startY = height * 0.55 + index * 20; 
    ctx.moveTo(0, startY);

    for (let x = 0; x < width; x++) {
      let y = startY + wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
