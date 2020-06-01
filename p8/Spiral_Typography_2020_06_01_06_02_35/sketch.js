var x1, x2, y1, y2, r, t;
var rot;
var words = 'Sogang University Art & Technology';
var wLen;
var wLoc;
var tSize;
var hueV;

var rMainSlider;
var gMainSlider;
var bMainSlider;
var r2MainSlider;
var g2MainSlider;
var b2MainSlider;

var backR;
var backG;
var backB;

var wordR;
var wordG;
var wordB;

var wordInput;
var startButton;
var flag;

function setup() {
  createCanvas(700, 700);
  angleMode(RADIANS);
  background(255);
  textFont('serif');
  textStyle(BOLD);
  r = 0;
  t = 0;
  rot = 0;
  wLen = words.length;
  wLoc = 0;
  tSize = 0;
  flag = 0;
  
  rMainSlider = createSlider(0, 255, 125);
  rMainSlider.position(60, 30);
  rMainSlider.size(100);
  gMainSlider = createSlider(0, 255, 15);
  gMainSlider.position(60, 60);
  gMainSlider.size(100);
  bMainSlider = createSlider(0, 255, 125);
  bMainSlider.position(60, 90);
  bMainSlider.size(100);
  
  r2MainSlider = createSlider(0, 255, 255);
  r2MainSlider.position(260, 30);
  r2MainSlider.size(100);
  g2MainSlider = createSlider(0, 255, 255);
  g2MainSlider.position(260, 60);
  g2MainSlider.size(100);
  b2MainSlider = createSlider(0, 255, 100);
  b2MainSlider.position(260, 90);
  b2MainSlider.size(100);
  
  wordInput = createInput();
  wordInput.position(480, 90);
  wordInput.size(100);
  wordInput.changed(wordInp);
  
  startButton = createButton('Start');
  startButton.position(wordInput.x + wordInput.width, 90);
  startButton.mousePressed(startDraw);
}

function wordInp()
{
  words = wordInput.value(); 
  wordInput.value('');
}

function startDraw()
{
  flag = 1; 
  backR = r2MainSlider.value();
  backG = g2MainSlider.value();
  backB = b2MainSlider.value();
  
  wordR = rMainSlider.value();
  wordG = gMainSlider.value();
  wordB = bMainSlider.value();
  background(backR, backG, backB);
  
  r = 0;
  t = 0;
  rot = 0;
  wLoc = 0;
  wLen = words.length;
  tSize = 0;
  
}

function draw() {
  
  UIDraw();
  if(flag == 1)
  {
    translate(width/2, height/2 +60);
    x1 = r * sin(t);
    y1 = r * cos(t);
    r += 0.5;
    tSize += 2;
    textSize(sqrt(tSize));
    t += 0.1;
    rot += 0.1;
    if(rot == PI)
    {
      rot = 0;
    }
    translate(x1,y1);
    rotate(t);
    fill(wordR, wordG, wordB);
    text(words.charAt(wLoc),0,0);
    wLoc++;
    if(wLoc == wLen)
    {
      wLoc = 0;
    }
  }
}

function UIDraw()
{
  push();
  fill(130,130,130);
  quad(0,0,0,120,width,120,width,0);
  pop();
  
  push();
  textStyle(BOLD);
  colorMode(RGB);
  textSize(15);
  fill(255, 0, 0);
  text("R", 50, 47);
  text("R", 250, 47);
  fill(0, 255, 0);
  text("G", 50, 77);
  text("G", 250, 77);
  fill(0, 0, 255);
  text("B", 50, 107);
  text("B", 250, 107);
  fill(255);
  text("TEXT" ,90, 27);
  text("BACKGROUND", 255, 27);
  text("WORDS", 520, 85);
  
  push();
  textSize(30);
  fill(0);
  text("Spiral Typography", 420, 45);
  pop();
  
  push();
  fill(rMainSlider.value(), gMainSlider.value(), bMainSlider.value());
  quad(180, 37, 180, 107, 170, 107, 170, 37);
  fill(r2MainSlider.value(), g2MainSlider.value(), b2MainSlider.value());
  quad(380, 37, 380, 107, 390, 107, 390, 37);
  pop();
}