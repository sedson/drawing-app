// renders image on canvas and puts updated
// drawings to database
// -----------------------------------------

const id = window.location.pathname.split('/')[2];

async function update() {
  const request = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      img: canvas.toDataURL('image/png')
    })
  };
  await fetch('/drawings/' + id, request);
}


const btn = document.querySelector('#save');

btn.onclick = () => {
  update().then(() => {
    canvas.wipe();
    window.location.pathname = '/drawings/' + id;
  })
}


// Loading image onto canvas
let dummy = document.querySelector('#art')

let img = new Image();

img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

img.src = dummy.dataset.src
