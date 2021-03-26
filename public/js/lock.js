// current ID
const id = window.location.pathname.split('/')[2];

const lock = async() => {
  const request = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
  };
  return await fetch('/drawings/' + id + '/lock', request)
}

const lockBtn = document.querySelector('#lockBtn');

if(lockBtn) {
  console.log('lockbtn found')
  lockBtn.onclick= () => {
    console.log('clicked')
    lock().then(response => {
      if (! response.ok) {
        return;
      }
      location.reload();
    })
  }
}
