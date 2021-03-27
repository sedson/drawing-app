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
      let warning = document.querySelector('#warning');
      if (warning) {
        let clone = warning.cloneNode(true);
        clone.classList.add('shrink');
        warning.parentNode.replaceChild(clone, warning);
      }
      return;
    }
    canvas.wipe();
    window.location.pathname = '/drawings';
  })
}

document.querySelector('#wipe').onclick = canvas.wipe;
document.dispatchEvent(new Event('jsready'));
