const { ipcRenderer } = require('electron');

ipcRenderer.on('counter-started', function(){
    let num = 5;
    let counter = document.getElementById('counter');
    counter.innerText = num;
    setInterval(function(){
        num--;
        counter.innerText = num;
    }, 1000);
});