let num = 5;
let counter = document.getElementById('counter');
counter.innerText = num;
let counterIntervalId = setInterval(function(){
    num--;
    counter.innerText = num;
    if (num==0) clearInterval(counterIntervalId);
}, 1000);
