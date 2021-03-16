// utility to post drawing to our database


const btn = document.querySelector('#save');
// const canvas = document.querySelector('#artboard');

btn.onclick = () => {
  let request = new XMLHttpRequest();

  let url = document.URL.split('/');
  let id = url[url.length - 2]

  request.open("PUT", "/drawings/" + id, true);
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(JSON.stringify({
    img: canvas.toDataURL('image/png', 1),
  }))


}


// img.style.display = 'block'
// img.src = img['data-src']
let dummy = document.querySelector('#art')

let img = new Image();

img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

img.src = dummy.dataset.src