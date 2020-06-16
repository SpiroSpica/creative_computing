var seoulAir;
var seoulCount = 0;
var airData = [];
var url = 'DataAll.json';
var targetYear = 1990;
//var url = 'https://cors-anywhere.herokuapp.com/http://openAPI.seoul.go.kr:8088/457a73784768617438394b506b4a70/json/YearlyAverageAirQuality/1/40/';


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  seoulAir = loadJSON(url);

  textSize(18);
  textAlign(LEFT, TOP);
  noStroke();
  seoulCount = 0;
}

function draw() {  
  if (seoulAir == null) return;
  loc = 1;
  while(seoulAir.DATA[loc].msrdt_year != targetYear)
  {
     loc++; 
  }
  var nDist = 40;
  var pollute = 0;
  
  var tim = map(mouseX,0,width,168,240);
  var light = map(mouseX, 0, width, 20, 67);
  
  for(var i = 0; i< nDist; i++)
  {
    let dat = seoulAir.DATA[i + loc].pm10;
    if(dat == null)
      dat = 0;
    airData[i] = dat;
    pollute += dat;
  }
  pollute /= 40;
  pollute = map(pollute, 0, 100, 0, 1);
  background(tim,49,100 - pollute * 100 + 10);
  push();
  fill(light,68, 100-pollute * 100 + 10);
  circle(mouseX,100,80);
  pop();
  for(var i = 0; i< nDist; i++)
  {
    let perct = map(airData[i], 0,100, 0, 1);
    fill(100 - airData[i] + 20 - (tim-168)/4);
    quad(width/40 * i, height, width/40 * (i+1), height, width/40 * (i+1), height * (1 - perct), width/40 * i, height * (1 - perct));
  }
  
  push();
  textSize(40);
  stroke(255);
  fill(255);
  text(targetYear, width - 100, height - 50);
  pop();
}

function mousePressed()
{
  targetYear ++;
  if(targetYear == 2021)
    targetYear = 1990;
}
