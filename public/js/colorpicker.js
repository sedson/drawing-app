const numSwatches = 22;

const randChan = () => Math.floor(Math.random() * 256)
const randCol = () => `rgb(${randChan()}, ${randChan()}, ${randChan()})`

const selectSwatch = (event) => {
  swatches.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');
  userColor.value = event.target.style.backgroundColor;
}

const swatchArea = document.querySelector('.swatch-area');

const swatches = [];

for (let i = 0; i < numSwatches; i++) {
  let swatch = document.createElement('div');
  swatch.classList.add("swatch");
  swatch.style.backgroundColor = randCol();
  swatch.onclick = selectSwatch;
  swatches.push(swatch);
  swatchArea.appendChild(swatch);

  if (i === 0) {
    swatch.classList.add('selected');
    userColor.value = swatch.style.backgroundColor;
  }
}
