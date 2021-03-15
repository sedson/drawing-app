// Canvas drawing tool

// some ideas borrowed from Charles Broskoski – http://charlesbroskoski.com/drawings/#
// and from DevEd youtube channel https://youtu.be/3GqUM4mEYKA

const canvas = document.querySelector('#artboard');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const strokeWeight = 8;
const strokeSmoothing = 6;

const fillCol = 'hotpink';

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

const endDraw = () => {
  drawing = false;
  ctx.beginPath();
}

const draw = (event) => {
  if (! drawing) return;

  curX = event.clientX - canvas.offsetLeft;
  curY = event.clientY - canvas.offsetTop;

  let d = distanceSquared(curX, curY, lastX, lastY);

  let stroke = strokeWeight - (d / (strokeWeight * strokeWeight))

  stroke = Math.max(1, stroke)
  stroke = updateStrokeArray(strokeHistory, stroke)

  ctx.lineWidth = stroke;
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
