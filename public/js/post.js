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
      img: canvas.toDataURL('image/png'),
      title: document.querySelector('#title').value
    })
  };
  return await fetch('/drawings', request);
}

const btn = document.querySelector('#post');
btn.onclick = () => {
  post().then((response) => {
    if(! response.ok) {
      let w = document.querySelector('#warning')
      w.style.display = 'block'
      w.textContent = 'Log in to Post'
      return
    }
    canvas.wipe();
    window.location.pathname = '/drawings';
  })
}

document.querySelector('#wipe').onclick = canvas.wipe;
