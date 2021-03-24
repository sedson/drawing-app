// Canvas drawing tool
// main stucture from DevEd youtube channel - https://youtu.be/3GqUM4mEYKA
// some ideas borrowed from Charles Broskoski – http://charlesbroskoski.com/drawings/#
// -----------------------------------------

const canvas = document.querySelector('#artboard');
const ctx = canvas.getContext("2d");

// Clears the canvas
canvas.wipe = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

// magic numbers from the class
// to deal with canvas scaling
const canvasSize = 400;
const padding = 16;

// This handles scaling if the canvas has been scaled
// down by css
document.addEventListener('jsready', () => {
  let scaleFactor = Math.min(1, (window.innerWidth - (2 * padding)) / canvasSize);
  ctx.scale(1/scaleFactor, 1/scaleFactor);
  scale = scaleFactor;
})

let strokeWeight = 5;
const strokeSmoothing = 6;
let scale = 1;

let fillCol = userColor || 'black';

let curX = 0, curY = 0, lastX = 0, lastY = 0;
let drawing = false;

const strokeHistory = new Array(strokeSmoothing).fill(strokeWeight)

const distanceSquared = (x1, y1, x2, y2) => {
  let dX = x2 - x1;
  let dY = y2 - y1;
  return dX * dX + dY * dY;
}

// Adds a value to the back of an array, and unshifts one from front
// Returns the average
const updateStrokeArray = (arr, val) => {
  let sum = 0;
  for(let i = 0; i < arr.length - 1; i++){
    arr[i] = arr[i + 1]
    sum += arr[i]
  }
  arr[arr.length - 1] = val;
  return (sum + val) / arr.length;
}

// Drawing functions
const startDraw = (event) => {
  lastX = event.clientX - canvas.offsetLeft;
  lastY = event.clientY - canvas.offsetTop;
  drawing = true;
}

const endDraw = (event) => {
  drawing = false;
  ctx.beginPath();
}

const draw = (event, touch) => {
  if (! drawing) return;

  curX = event.clientX - canvas.offsetLeft;
  curY = event.clientY - canvas.offsetTop;

  if (event.touches) {
    curX = event.touches[0].clientX - canvas.offsetLeft;
    curY = event.touches[0].clientY - canvas.offsetTop;
  }

  let d = distanceSquared(curX, curY, lastX, lastY);

  let stroke = strokeWeight - (d / (strokeWeight * strokeWeight))
  stroke = Math.max(1, stroke)
  stroke = updateStrokeArray(strokeHistory, stroke)

  ctx.lineWidth = stroke * scale;
  ctx.strokeStyle = fillCol;
  ctx.lineCap = 'round'

  ctx.lineTo(curX, curY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(curX, curY);

  lastX = curX;
  lastY = curY;
}


canvas.onmousedown = startDraw;
canvas.onmouseup = endDraw;
canvas.onmouseleave = endDraw;
canvas.onmousemove = draw;

canvas.addEventListener('touchstart', (event) => {
  startDraw(event);
  event.preventDefault();
})

canvas.addEventListener('touchend', (event) => {
  endDraw(event);
  event.preventDefault();
})

canvas.addEventListener('touchmove', (event) => {
  draw(event);
  event.preventDefault();
})
