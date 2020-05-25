var x;
var y;
var r, g, b;
var xC = [];
var yC = [];
var stepSize = 5.0;
var font = 'Georgia';
var letters = "Sogang University Art & Technology Creation Beyond Imagination";
var fontSizeMin = 3;
var counter = 0;

var rMainSlider;
var gMainSlider;
var bMainSlider;
var denSlider;
var sizSlider;
var offset = 10;
var shape;
var col = [];

function setup() {
  // use full screen size
  createCanvas(800, 800);
  background(255);
  angleMode(RADIANS);
  cursor(CROSS);
  x = mouseX;
  y = mouseY;
  textFont(font);
  textAlign(LEFT);
  fill(0);
  frameRate(60);
  rMainSlider = createSlider(0, 255, 125);
  rMainSlider.position(40, 30);
  rMainSlider.size(100);
  gMainSlider = createSlider(0, 255, 15);
  gMainSlider.position(40, 60);
  gMainSlider.size(100);
  bMainSlider = createSlider(0, 255, 125);
  bMainSlider.position(40, 90);
  bMainSlider.size(100);

  denSlider = createSlider(1, 50, 15);
  denSlider.position(300, 30);
  denSlider.size(100);
  sizSlider = createSlider(1, 100, 15);
  sizSlider.position(300, 60);
  sizSlider.size(100);
  dotSlider = createSlider(1, 30, 15);
  dotSlider.position(300, 90);
  dotSlider.size(100);
  shape = createSelect();

  shape.position(620, 62);
  shape.option('Rainbow');
  shape.option('Spray');
  noStroke();

  clearButton = createButton('Clear');
  clearButton.position(700, 62);
  clearButton.mousePressed(clearBack);

  col[0] = color(255, 0, 0);
  col[1] = color(255, 128, 0);
  col[2] = color(255, 255, 0);
  col[3] = color(0, 255, 0);
  col[4] = color(0, 0, 255);
  col[5] = color(0, 0, 80);
  col[6] = color(128, 0, 255);

}

function clearBack() {
  push();
  fill(255);
  quad(0, 130, 0, 800, 800, 800, 800, 130);
  pop();
}

function draw() {
  fill(180, 180, 180);
  quad(0, 0, 0, 130, 800, 130, 800, 0);

  r = rMainSlider.value();
  g = gMainSlider.value();
  b = bMainSlider.value();

  push();
  textStyle(BOLD);
  textSize(15);
  fill(255, 0, 0);
  text("R", 30, 47);
  fill(0, 255, 0);
  text("G", 30, 77);
  fill(0, 0, 255);
  text("B", 30, 107);
  fill(0);


  textStyle(NORMAL);
  text(r, 145, 47);
  text(g, 145, 77);
  text(b, 145, 107);
  text("Brush Type", 640, 55);
  text("Density", 245, 47);
  text("Range  ", 245, 77);
  text("Size   ", 245, 107);
  text(denSlider.value(), 410, 47);
  text(sizSlider.value(), 410, 77);
  text(dotSlider.value(), 410, 107);

  pop();

  push();
  fill(r, g, b);
  quad(30, 10, 30, 20, 140, 20, 140, 10);
  pop();

  if (mouseIsPressed && mouseButton == LEFT && mouseY >= 130) {
    var d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);
    if (d > stepSize) {
      if (shape.value() == 'Spray') {
        push();
        fill(r, g, b);
        let range = sizSlider.value();
        let dense = denSlider.value();
        let size = dotSlider.value() / 5;
        for (let i = 0; i < dense; i++) {
          let xRand = random(-range, range);
          let yRand = random(-range, range);
          if (mouseY + yRand <= 130)
            continue;
          circle(mouseX + xRand, mouseY + yRand, size);
        }

        x = mouseX;
        y = mouseY;
        pop();
      }
      if (shape.value() == 'Rainbow') {
        push();
        let size = dotSlider.value();
        let angle = atan2(mouseY - y, mouseX - x);

        let difX = mouseX - x;
        let difY = mouseY - y;

        translate(x, y);
        rotate(angle);

        for (let i = 0; i < 7; i++) {
          stroke(col[i]);
          strokeWeight(size);
          line(0, i * size, d + i * size * 0.25, i * size);
        }

        pop();
        x = mouseX;
        y = mouseY;
      }
    }


  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}