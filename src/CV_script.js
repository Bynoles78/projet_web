const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const snowflakes = [];
const SNOWFLAKE_COUNT = 80;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
  snowflakes.push({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    r: randomBetween(1, 3),
    speed: randomBetween(0.5, 2),
    drift: randomBetween(-0.5, 0.5)
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "#fff";
  for (const f of snowflakes) {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

function updateSnow() {
  for (const f of snowflakes) {
    f.y += f.speed;
    f.x += f.drift;
    if (f.y > height) {
      f.y = -f.r;
      f.x = randomBetween(0, width);
    }
    if (f.x < 0) f.x = width;
    if (f.x > width) f.x = 0;
  }
}

function animate() {
  drawSnow();
  updateSnow();
  requestAnimationFrame(animate);
}
animate();