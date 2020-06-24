function preload(){
  song = loadSound('bgm.mp3');
}

function setup() {
  song.play();
  createCanvas(1280,720);
  colorMode(HSB);
}

var song;
var flag = 0;
var colorFlag = 30;
var lisX = [];
var lisY = [];
var a = 1;
var s = 1;
var lisLen = 0;
var oldX = 0;
var oldY = 0;
var rotateWorld = 0;
var changeX;
var changeY;
var turnRate= 0.01;

var whiteTrace = [];

class trace 
{
  constructor(x, y) 
  {
    this.x = x;
    this.y = y;
  }
}


function draw() {
  background(0);
  drawBackground();
  drawEffect();
  drawStructure();
  
}

function drawBackground()
{
  let centX = mouseX;
  let centY = mouseY;
  let frameC = frameCount;

  
  if(flag == 1 && frameCount % 20 == 0)
  {
    colorFlag -= 1;    
  }
  else if(flag == 0 && frameCount % 20 == 0 && colorFlag < 30)
  {
     colorFlag += 1; 
  }
  push();
  translate(mouseX,mouseY);
  for(let i= 0; i<500 ;i++)
  {
    let dColor = color((i + frameC * 2)%360,colorFlag,100);
    noStroke();
    fill(dColor);
    circle(0,0,3500 - i * 7);
  }
  pop();
     
}

function drawEffect()
{
  whiteTrace.unshift(new trace(mouseX, mouseY))
  let len = whiteTrace.length;
  let traceSiz = 10;
  while(len > 10)
  {
    whiteTrace.pop();
    len = whiteTrace.length;
  }
  for(let i = 0; i< len; i++)
  {
    push();
    fill(360,0,100,100-i);
    noStroke();
    circle(whiteTrace[i].x,whiteTrace[i].y,traceSiz);
    if(i + 1 != len)
    {
       let xDis = whiteTrace[i+1].x - whiteTrace[i].x;
       let yDis = whiteTrace[i+1].y - whiteTrace[i].y;
       for(let k= 0; k < 10; k++)
       {
          circle(whiteTrace[i].x + xDis * k / 10, whiteTrace[i].y + yDis * k / 10, traceSiz);
       }
    }
    traceSiz *= 0.90;
    pop();
  }
}

function keyTyped()
{
   if(key === 'e')
   {
     if(flag == 0)
       flag = 1;
     else if(flag == 1)
       flag = 0;
     print('got');
   }
}

var lineAlpha = 100;

function drawStructure()
{
  noFill();
  s = 1;
  a = 1;
  
  if(flag == 1 && frameCount % 6 == 0 && lineAlpha > 0)
  {
     lineAlpha -= 1; 
  }
  else if(flag == 0 && frameCount % 6 == 0 && lineAlpha < 100)
  {
     lineAlpha += 1; 
  }
  
  push();
  strokeWeight(0.5);
  stroke(255,lineAlpha);
  translate(mouseX,mouseY);
  rotate(rotateWorld);
  
  for(let i = 0; i<100; i++)
  { 
    scale(s);
    rotate(a);
    rect(-5, -5, 10, 10);
    s += 0.007;
    a += turnRate;
  }
  pop();
  fill(255);
  
  turnRate += 0.00002;
  rotateWorld -= 0.04;
}