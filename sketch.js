var mic, fft, song;

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    wwidth = w.innerWidth || e.clientWidth,
    wheight = w.innerHeight|| e.clientHeight;

console.log (w.innerWidth + " "+ e.clientWidth);

function preload() {
    song = loadSound('assets/tundra.mp3');
    
}

function setup() {
    createCanvas(wwidth,wheight);
    noFill();
    colorMode(HSB, 255, 255, 255);  
    //mic = new p5.AudioIn();
    //mic.start();
    fft = new p5.FFT();
    fft.setInput(song);
    
}

function draw() {
    
    var spectrum = fft.analyze();
    //fill(color(204, 255, spectrum[0]));
    //background(color((spectrum[0] + 140)%255, 255, 255));
    background(color(125, 0, 0, 70));
    //background('blue');
    for (j = 0; j < 10; j++) {
        beginShape();
        for (i = 0; i<(spectrum.length/30); i++) {
           //stroke(color(spectrum[i + (j * 30)]%255, 200, 255));
            stroke(color(spectrum[i + (j * 30)]%255, 100, 255));
           //vertex(i * width/(spectrum.length/3), map(spectrum[i], 0, height, height, 0) );
           vertex(((i) * width/(spectrum.length/10)) + width/(3),
                 (height - height/10 * (j + 1)) - spectrum[i + (j * 30)]);
        }
        endShape();
    }
   
     /*
    for (i = 0; i < spectrum.length; i++) {
        stroke(color(i%255, 255, 255));
        ellipse(width/2,
                height/2,
                spectrum[i]*2,
                spectrum[i]*2)
    }
*/
}

function keyPressed() {
    if (keyCode == TAB) {
        full();
    } else if (keyCode == ENTER) {
        if ( song.isPlaying() ) { 
            // .isPlaying() returns a boolean
            console.log("Pause")
            paused = true;
            song.pause();
        } else {
            
            paused = false;
            console.log("Play")
            song.play();
        }
    }
}


function full() {
    launchIntoFullscreen(e);
        wwidth = w.innerWidth || e.clientWidth;
        wheight = w.innerHeight|| e.clientHeight;
        setup();
}

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}