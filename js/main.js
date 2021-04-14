// INITIALISER
const MAX_SIZE = 100;
const MIN_SIZE = 5;
var width = parseInt(document.getElementById('width').value);
var height = parseInt(document.getElementById('height').value);

var world = new World(width, height);

var isPlayed = false;
var intervalFunction;
var nFrame = 0;

window.onload = function () {
    document.getElementById('frame-counter').innerText = nFrame;

    document.getElementById('step-forward').onclick = function () {
        update();
    };

    document.getElementById('stop').onclick = function () {
        if (isPlayed) {
            isPlayed = false;
            document.getElementById('play').children[0].classList.remove('fa-pause');
            document.getElementById('play').children[0].classList.add('fa-play');
            clearInterval(intervalFunction);
        }
        
        nFrame = 0;
        document.getElementById('frame-counter').innerText = nFrame;
        
        // Set all cell isAlive to false
        world.initialise();

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

    document.getElementById('height').onchange = function () {
        nFrame = 0;
        document.getElementById('frame-counter').innerText = nFrame;

        if (isPlayed) {
            isPlayed = false;
            this.children[0].classList.remove('fa-pause');
            this.children[0].classList.add('fa-play');
            clearInterval(intervalFunction);
        }

        height = parseInt(this.value);

        // CLAMP INPUT
        if (height > MAX_SIZE) {
            height = MAX_SIZE;
            alert('too big, your computer would not like it...');
        }
        else if (height < MIN_SIZE) {
            height = MIN_SIZE;
            alert('too small, the simulation would not be interesting...');
        }
        this.value = height;
        world = new World(width, height);

    };

    document.getElementById('width').onchange = function () {
        nFrame = 0;
        document.getElementById('frame-counter').innerText = nFrame;

        if (isPlayed) {
            isPlayed = false;
            this.children[0].classList.remove('fa-pause');
            this.children[0].classList.add('fa-play');
            clearInterval(intervalFunction);
        }

        width = parseInt(this.value);

        // CLAMP INPUT
        if (width > MAX_SIZE) {
            width = MAX_SIZE;
            alert('too big, your computer would not like it...');
        }
        else if (width < MIN_SIZE) {
            width = MIN_SIZE;
            alert('too small, the simulation would not be interesting...');
        }
        this.value = width;
        world = new World(width, height);

    };

};

function update() {
    nFrame++;
    document.getElementById('frame-counter').innerText = nFrame;
    world.update();
    world.display();
};