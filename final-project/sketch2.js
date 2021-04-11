var w = 1024;
var h = 512;
var mapimg;
var table;

var clat = 0;
var clon = 0;

var lat = 0;
var lon = 0;

var wlat = 38.89;
var wlon = -100.03;

var zoom = 1;


function preload() // code from youtube channel - The Coding Train
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiY2hlbmd3ZWltYSIsImEiOiJja213MWdzMnEwYW0xMnZxbnBocWthdmVyIn0.04mlQToUTEG6Ww5cbSn6Dw');
  table = loadStrings("data/projectdata.csv");
}

function mercX(lon){
  lon = radians(lon);
  var a = (256/PI) * pow(2,zoom);
  var b = lon + PI;
  return a*b;
}

function mercY(lat){
  lat = radians(lat);
  var a = (256/PI) * pow(2,zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a*c;
}

function setup() {
  // put setup code here
  createCanvas(w,h);
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);

  var cx = mercX(clon);
  var cy = mercX(clat);
  console.log(cx);
  console.log(cy);

  for (var i = 1; i < table.length; i++){
    var data = table[i].split(/,/);
    // console.log(data);
    var lat = data[1]; //capital latitude
    var lon = data[2]; //capital longitude
    var divPer = data[4]; //divorced people proportion
    var circleColor= map(divPer,0.05,0.40,200,0);

    var x = mercX(lon)-cx;
    var y = mercY(lat)-cy;
    console.log(divPer);
    console.log(circleColor);
    var x0 = mercX(wlon)-cx;
    var y0 = mercY(wlat)-cy;
    console.log(x0);
    console.log(y0);

    // line between capitals and watshington
    stroke('rgba(232,232,232,0.25)');
    line(x0,y0,x,y);

    // captital circles
    fill(235,circleColor,circleColor);
    ellipse(x,y,10,10);

    // watshington circles
    fill("#7adf80");
    ellipse(x0,y0,20,20);
  }
}


function draw() {
  // data is not imported yet
{ textSize (15); // edu bar
  fill(255, 255, 255);
  text('Divorced people by education',40,300);

  textFont("Arial");
  fill(51, 153, 250);
  noStroke();
  rect(65, 400, 20, 50);
  rect(95, 330, 20, 120);
  rect(125, 350, 20, 100);
  rect(155, 350, 20, 100);
  rect(185, 360, 20, 90);

  stroke(211, 211, 211);
  line(60, 450, 230, 450) //x
  line(60, 320, 60, 450) //y

  // X axis lable
  fill(255, 255, 255);
  noStroke();
  textSize (10);
  textAlign(CENTER);
  text('LT HIGH SCHOOL', 80,470);
  // text('HIGH SCHOOL', 180,470);
  // text('JUNIOR COLLEGE', 120,470);
  // text('BACHELOR', 360,470);
  text('GRADUATE', 200,470);

  // Y axis lable
  fill(255, 255, 255);
  noStroke();
  text(0,50,450);
  text(20,50,400);
  text(60,50,350);
}

{ textSize (15); // income bar
  fill(255, 255, 255);
  text('Divorced people by income',840,300);

  textFont("Arial");
  fill(51, 153, 250);
  noStroke();
  rect(765, 400, 20, 50);
  rect(795, 330, 20, 120);
  rect(825, 350, 20, 100);
  rect(855, 350, 20, 100);
  rect(885, 360, 20, 90);

  stroke(211, 211, 211);
  line(760, 450, 930, 450) //x
  line(760, 320, 760, 450) //y

  // X axis lable
  fill(255, 255, 255);
  noStroke();
  textSize (10);
  textAlign(CENTER);
  text('<$1000', 780,470);
  text('>$25000', 900,470);

  // Y axis lable
  fill(255, 255, 255);
  text(0,750,450);
  text(20,750,400);
  text(60,750,350);
  nostroke();
}

}
