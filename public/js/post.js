// utility to post drawing to our database

const btn = document.querySelector('#post');
// const canvas = document.querySelector('#artboard');

btn.onclick = () => {
  let request = new XMLHttpRequest();

  request.open("POST", "/drawings", true);
  request.setRequestHeader('Content-Type', 'application/json')

  request.send(JSON.stringify({
    img: canvas.toDataURL('image/png', 1),
  }))

  canvas.wipe();
  Response.redirect('/drawings')
}

document.querySelector('#wipe').onclick = canvas.wipe;
