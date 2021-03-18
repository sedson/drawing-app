// posts drawings to database
// -----------------------------------------
const post = async() => {
  const request = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      img: canvas.toDataURL('image/png')
    })
  };
  await fetch('/drawings', request);
}

const btn = document.querySelector('#post');
btn.onclick = () => {
  post().then(() => {
    canvas.wipe();
    window.location.pathname = '/drawings';
  })
}

document.querySelector('#wipe').onclick = canvas.wipe;


console.log('should be 2st')
