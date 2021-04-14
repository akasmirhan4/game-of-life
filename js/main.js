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
        nFrame = 0;
        document.getElementById('frame-counter').innerText = nFrame;

        // Set all cell isAlive to false
        for (var y = 0; y < world.HEIGHT; y++) {
            for (var x = 0; x < world.WIDTH; x++) {
                world.cells[x][y].isAlive = false;
                let element = document.querySelector(`.row[y='${y}'] .cells[x='${x}']`);
                element.removeAttribute('isAlive');
            }
        }

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

        height = parseInt(this.value);

        // CLAMP INPUT
        if(height > MAX_SIZE){
            height=  MAX_SIZE;
            alert('too big, your computer would not like it...');
        }
        else if(height < MIN_SIZE){
            height =  MIN_SIZE;
            alert('too small, the simulation would not be interesting...');
        }
        this.value = height;
        world = new World(width, height);

    };

    document.getElementById('width').onchange = function () {

        width = parseInt(this.value);

        // CLAMP INPUT
        if(width > MAX_SIZE){
            width=  MAX_SIZE;
            alert('too big, your computer would not like it...');
        }
        else if(width < MIN_SIZE){
            width =  MIN_SIZE;
            alert('too small, the simulation would not be interesting...');
        }
        this.value = width;
        world = new World(width, height);

    };

    document.getElementsByClassName('cells').onclick
};

function update() {
    nFrame++;
    document.getElementById('frame-counter').innerText = nFrame;
    world.update();
};