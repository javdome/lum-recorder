
navigator.mediaDevices.getUserMedia({video: true})
.then(function(stream) {
  document.getElementById('mycam').srcObject = stream;
  
}).catch(function() {
  console.log('could not connect stream');
});