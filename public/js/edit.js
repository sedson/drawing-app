// renders image on canvas and puts updated
// drawings to database
// -----------------------------------------

// current ID
const id = window.location.pathname.split('/')[2];

const update = async() => {
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
  return await fetch('/drawings/' + id, request);
}


const btn = document.querySelector('#save');

btn.onclick = () => {
  update().then(response => {
    if (! response.ok) {
      return;
    }
    window.location.pathname = '/drawings/' + id;
  })
}

// Loading image onto canvas

const loadCanvas = () => {
  let dummy = document.querySelector('#art');
  let img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    document.dispatchEvent(new Event('jsready'));
  }

  img.src = dummy.dataset.src;
}

loadCanvas();
