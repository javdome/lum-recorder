
navigator.mediaDevices.getUserMedia({video: true})
.then(function(stream) {
  document.getElementById('mycam').srcObject = stream;
  
}).catch(function() {
  console.log('could not connect stream');
});

require('electron').ipcRenderer.on('loaded', (event, message) => {
  if (message[0]) {
    document.getElementById('mycam').classList.add('round-cam');
  } else {
    document.getElementById('mycam').classList.remove('round-cam');
  }

})