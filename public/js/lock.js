// Allows users to toggle the lock state of a drawing
// a locked drawing cannot be edited

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
  lockBtn.onclick= () => {
    lock().then(response => {
      if (! response.ok) {
        return;
      }
      location.reload();
    })
  }
}
