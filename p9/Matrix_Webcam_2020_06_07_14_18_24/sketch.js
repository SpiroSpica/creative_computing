
let img;
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createCapture(VIDEO);
  img.loadPixels();
}

function draw() {
  background(30);
  img.loadPixels();
  for (let y = 0; y < img.height; y += 7) {
    for (let x = 0; x < img.width; x += 7) {
      let id = (x + img.width * y) * 4;
      let red = img.pixels[id];
      let green = img.pixels[id + 1];
      let blue = img.pixels[id + 2];
      let c = color(50, green, 50);
      let posX = x * width / img.width;
      let posY = y * height / img.height;
      // greyscale to type
      fill(c);

      textSize(15);
      var zeroOne = random(0, 3);

      if (zeroOne <= 1) {
        var ch = '0';
      }
      else {
        var ch = '1';
      }
      text(ch, posX, posY);
    }
  }
}