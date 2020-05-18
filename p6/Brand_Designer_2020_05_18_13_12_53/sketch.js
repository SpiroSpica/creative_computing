var rMainSlider, gMainSlider, bMainSlider;
var rSubSlider, gSubSlider, bSubSlider;
var rBackSlider, gBackSlider, bBackSlider;
var mainInput, extraInput, mainButton, extraButton;
var shape, fontType, bold, itallic;
var title, slogan;
var font = [];

function preload()
{
  font[0] = loadFont('Night Shift.ttf');
  font[1] = loadFont('Old London.ttf');
  font[2] = loadFont('Stabillo Medium.ttf');
  font[3] = loadFont('Varsity.ttf');
}

function setup() 
{
  createCanvas(800, 800);
  textSize(15);
  textAlign(CENTER);
  noStroke();
  // create sliders

  rMainSlider = createSlider(0, 255, 125);
  rMainSlider.position(40, 30);
  rMainSlider.size(80);
  gMainSlider = createSlider(0, 255, 15);
  gMainSlider.position(40, 60);
  gMainSlider.size(80);
  bMainSlider = createSlider(0, 255, 125);
  bMainSlider.position(40, 90);
  bMainSlider.size(80);
  
  rSubSlider = createSlider(0, 255, 100);
  rSubSlider.position(160, 30);
  rSubSlider.size(80);
  gSubSlider = createSlider(0, 255, 100);
  gSubSlider.position(160, 60);
  gSubSlider.size(80);
  bSubSlider = createSlider(0, 255, 100);
  bSubSlider.position(160, 90);
  bSubSlider.size(80);

  rBackSlider = createSlider(0, 255, 200);
  rBackSlider.position(280, 30);
  rBackSlider.size(80);
  gBackSlider = createSlider(0, 255, 200);
  gBackSlider.position(280, 60);
  gBackSlider.size(80);
  bBackSlider = createSlider(0, 255, 200);
  bBackSlider.position(280, 90);
  bBackSlider.size(80);
  
  mainInput = createInput();
  mainInput.position(395, 35);
  mainInput.size(120);
  mainInput.changed(titleInp);
  mainButton = createButton('Title');
  mainButton.position(mainInput.x + mainInput.width, 35);
  mainButton.mousePressed(titleInp);
  
  extraInput = createInput();
  extraInput.position(580, 35);
  extraInput.size(100);
  extraInput.changed(sloganInp);
  extraButton = createButton('Slogan');
  extraButton.position(extraInput.x + extraInput.width, 35);
  extraButton.mousePressed(sloganInp);
  
  shape = createSelect();
  shape.position(385,90);
  shape.option('Square');
  shape.option('Circle');
  shape.option('None');
  
  fontType = createSelect();
  fontType.position(475,90);
  fontType.option('Night Shift');
  fontType.option('Old London');
  fontType.option('Stabillo Medium');
  fontType.option('Varsity');
  fontType.option('Normal');
  fontType.size(90);
  
  bold = createCheckbox('Bold', false);
  bold.position(590,90);
  itallic = createCheckbox('Itallic',false);
  itallic.position(680, 90);
  
  title = "Brand";
  slogan = "slogan";
}

function sloganInp()
{
  slogan = extraInput.value();
  extraInput.value('');
}

function titleInp() 
{
  title = mainInput.value();
  mainInput.value('');
}

function capFirstLetter(string) 
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function draw() 
{
  background(120);
  fill(255);
  rect(0,120,width,height - 120);
  title = capFirstLetter(title);
  
  push();
  stroke(255);
  textSize(15);
  text("Main Color", 80, 25);
  text("Sub Color", 200, 25);
  text("Background", 320, 25);
  text("Title", 470, 25);
  text("Slogan", 660, 25);
  text("Shape",420,80);
  text("Font", 520,80);
  text("Option", 660, 80);
  
  noStroke();
  textStyle(BOLD);
  fill(255,0,0);
  text("R",30,47);  text("R",150,47);  text("R",270,47);
  fill(0,255,0);
  text("G",30,77);  text("G",150,77);  text("G",270,77);
  fill(0,0,255);
  text("B",30,107);  text("B",150,107);  text("B",270,107);
  
  pop();
  
  push();
  if(bold.checked() && itallic.checked())
  {
     textStyle(BOLDITALIC); 
  }
  else if(bold.checked())
  {
     textStyle(BOLD); 
  }
  else if(itallic.checked())
  {
     textStyle(ITALIC); 
  }
  else
  {
     textStyle(NORMAL); 
  }
  if(fontType.value() == 'Night Shift')
  {
     textFont(font[0]);  
  }
  else if(fontType.value() == 'Old London')
  {
     textFont(font[1]); 
  }
  else if(fontType.value() == 'Stabillo Medium')
  {
     textFont(font[2]); 
  }
  else if(fontType.value() == 'Varsity')
  {
     textFont(font[3]); 
  }
  else if(fontType.value() == 'Normal')
  {
  
  }
  
  push();
  noStroke();
  fill(rBackSlider.value(), gBackSlider.value(), bBackSlider.value());
  if(shape.value() == 'Square')
  {
    if(itallic.checked() && fontType.value() == 'Normal')
    {
      rect(width/4 + 30, height/4 + 60, width/2, (height)/2);
    }
    else
    {
      rect(width/4,height/4 + 60, width/2, (height)/2);
    }
  }
  else if(shape.value() == 'Circle')
  {
    if(fontType.value() == 'Stabillo Medium')
    {
      circle(width/2,(height/2 + 40) + 40,width/2);
    }
    else
    {
       circle(width/2,(height/2 + 40) + 20,width/2);
    }
  }
  
  pop();
  
  push();
  textSize(300);
  stroke(137);
  fill(rMainSlider.value(), gMainSlider.value(), bMainSlider.value());
  text(title[0], width/2, height/2 + 130);
  textSize(70);
  text(title,width/2, height/2 + 200);
  pop();
  
  push()
  textSize (30);
  fill(rSubSlider.value(), gSubSlider.value(), bSubSlider.value());
  text(slogan, width/2, height/2 + 230);
  pop();
  pop();
  
}