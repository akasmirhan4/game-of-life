// INITIALISER

const WIDTH = 50;
const HEIGHT = 50;

var world = new World(WIDTH, HEIGHT);
var isPlayed = false;
var intervalFunction;
var nFrame = 0;

window.onload = function () {
    document.getElementById('frame-counter').innerText = nFrame;

    document.getElementById('step-forward').onclick = function () {
        update();
    };

    document.getElementById('play').onclick = function () {
        if (isPlayed) {
            isPlayed = false;
            this.children[0].classList.remove('fa-pause');
            this.children[0].classList.add('fa-play');
            clearInterval(intervalFunction);
        }
        else {
            let FPS = document.getElementById('speed').value;
            isPlayed = true;
            this.children[0].classList.add('fa-pause');
            this.children[0].classList.remove('fa-play');
            intervalFunction = setInterval(update, 1000 / FPS);
        }
    };

    document.getElementById('speed').onchange = function () {

        if (isPlayed) {
            let FPS = this.value;
            clearInterval(intervalFunction);
            intervalFunction = setInterval(update, 1000 / FPS);
        }
    };
};

function update() {
    nFrame++;
    document.getElementById('frame-counter').innerText = nFrame;
    world.update();
};