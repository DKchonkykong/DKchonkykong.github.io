// Get the canvas and its 2D context
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let time = 0;

// An array to hold all the wave configurations
const waves = [
  {
    amplitude: 70,       // How tall the wave is
    frequency: 0.015,    // How frequent the peaks and troughs are
    speed: 0.05,         // How fast the wave moves
    color: 'rgba(150, 0, 255, 0.4)', // Purple with transparency
  },
  {
    amplitude: 50,
    frequency: 0.02,
    speed: 0.03,
    color: 'rgba(255, 0, 150, 0.5)', // Pink with more transparency
  },
  {
    amplitude: 30,
    frequency: 0.03,
    speed: 0.02,
    color: 'rgba(100, 0, 200, 0.6)', // Deeper purple with transparency
  }
];

// Function to handle window resizing, making the canvas responsive
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
  // Clear the canvas on each frame
  ctx.clearRect(0, 0, width, height);

  // Update animation time for movement
  time += 0.01;

  // Loop through each wave and draw it
  waves.forEach((wave, index) => {
    // Start drawing a new path for this wave
    ctx.beginPath();
    
    // Move to the starting point of the wave
    // The starting y-position is slightly offset for each wave to create layers
    const startY = height * 0.55 + index * 20; 
    ctx.moveTo(0, startY);

    // Loop through the width of the canvas to draw the sine wave
    for (let x = 0; x < width; x++) {
      // Calculate the y-position based on the sine function
      let y = startY + wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed);
      ctx.lineTo(x, y);
    }

    // Close the path to create a filled shape
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    // Apply the wave's color and fill the shape
    ctx.fillStyle = wave.color;
    ctx.fill();
  });

  // Request the next animation frame for a continuous loop
  requestAnimationFrame(animate);
}

// Start the animation
animate();
