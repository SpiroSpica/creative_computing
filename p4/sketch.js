var starNum = 0;
var starMouses = [];
var backStars = [];
var pivot = 0;
var lastX;
var lastY;
var starMax = 3000;
var mouseMax = 30;
var starStartSize = 3;

class starMouse
{
  constructor(x,y,size,color)
  {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  
  drawStar()
  {
    push();
    fill(this.color, 49, 95);
    noStroke();
    star(this.x,this.y, this.size * 3, this.size * 7); 
    pop();
  }
}

class backStar
{
  constructor(x,y,curSize,maxSize,flag)
  {
    this.x = x;
    this.y = y;
    this.curSize = curSize;
    this.maxSize = maxSize;
    this.flag = flag;
  }
  
  setStar()
  {
    this.x = random(0,windowWidth);
    this.y = random(0,windowHeight);
    this.curSize = 0;
    this.maxSize = random(0,1.5);
    this.flag = -1;
  }
  
  update()
  {
    if(this.flag == -1)
     {
        this.curSize += 0.1;
       if(this.curSize > this.maxSize)
       {
          this.flag = 1;
       }
     }
     else if(this.flag == 1)
     {
        this.curSize -= 0.05;
       
       if(this.curSize < 0)
       {
          this.setStar();
       }
     }
  }
  
  drawStar(i)
  {
    push();
    fill(i%360, 49,95);
    noStroke();
    star(this.x,this.y, this.curSize * 3, this.curSize * 7);
    pop();
  }
}

function isClose(x,y)
{
  var distX = abs(x - mouseX);
  var distY = abs(y- mouseY);
  var dis = sqrt(distX * distX + distY * distY)
  if(dis < 100)
    return 1;
  else
    return 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  
  for(let i = 0; i<mouseMax; i++)
  {
      starMouses[i] = new starMouse(0-1,-1,-1,-1);
  }
  for(let i = 0; i<starMax; i++)
  {
      backStars[i] = new backStar(-1,-1,-1,-1,-1);
  }
  lastX = mouseX;
  lastY = mouseY;
  
  
  starMouses[0].x = mouseX;
  starMouses[0].y = mouseY;
  pivot++;
  for(let i = 0; i < starMax; i++)
  {
    backStars[i].setStar();
  }
}  

function draw() {
  background(202,64,20);
  
  var absX = abs(lastX - mouseX)
  var absY = abs(lastY - mouseY)
  var dist = sqrt(absX*absX + absY*absY);
  
  push();
  noStroke();
  fill(frameCount%360, 39, 95);
  star(mouseX,mouseY, 6, 14);

  pop();
  
  for(let i = 0; i<mouseMax; i++)
  {
    if(starMouses[i].size <= 0)
    {
      starMouses[i].size = 0 
    }
    else
    {
      starMouses[i].size -= 0.05;
    }
  }
  
  
  if(dist > 30)
  {
    lastX = mouseX;
    lastY = mouseY;
    starMouses[pivot].x = mouseX;
    starMouses[pivot].y = mouseY;
    starMouses[pivot].size = 3;
    starMouses[pivot].color = frameCount%360;
    pivot++;
    
    if(pivot >= mouseMax)
    {
       pivot = 0; 
    }
  }
  
  drawBackground();
  drawStars();
}

function drawBackground()
{
   for(let i = 0; i < starMax ; i++)
   {
     if(isClose(backStars[i].x,backStars[i].y))
       continue;
     backStars[i].drawStar(i);
     backStars[i].update();
     
   }
}

function drawStars()
{
  for(let i = 0; i < mouseMax; i++)
  {
     if(starMouses[i].x != -1)
     {
       push()
       starMouses[i].drawStar();
       
       if(starMouses[i].size <= 0.05)
       {
         starMouses[i].x = -1
       }
       else
       {
          starMouses[i].size -= 0.05; 
       }
       pop()
     }
  }
}

function star(x, y, radius1, radius2) {
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
