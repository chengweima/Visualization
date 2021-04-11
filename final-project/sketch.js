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
  table = loadTable("data/projectdata.csv","csv","header");
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
  countries = table.getColumn("Country");
  lat = table.getColumn("CapLat").map(Number);
  lon = table.getColumn("CapLon").map(Number);
  divPer = table.getColumn("DiviorcedRow N %").map(Number); //divorced proportion
  ltHighNum = table.getColumn("LT HIGH SCHOOLRow N %").map(Number); //LT HIGH SCHOOL Count
  highSNum = table.getColumn("HIGH SCHOOLRow N %").map(Number); //HIGH SCHOOL Count
  junColNum = table.getColumn("JUNIOR COLLEGERow N %").map(Number); //JUNIOR COLLEGE Count
  bacheNum = table.getColumn("BACHELORRow N %").map(Number); //BACHELOR Count
  graduNum = table.getColumn("GRADUATERow N %").map(Number); //GRADUATE Count
  income1 = table.getColumn("LT $1000Count").map(Number);
  income2 = table.getColumn("$1000 TO 2999Count").map(Number);
  income3 = table.getColumn("$3000 TO 3999Count").map(Number);
  income4 = table.getColumn("$4000 TO 4999Count").map(Number);
  income5 = table.getColumn("$5000 TO 5999Count").map(Number);
  income6 = table.getColumn("$6000 TO 6999Count").map(Number);
  income7 = table.getColumn("$7000 TO 7999Count").map(Number);
  income8 = table.getColumn("$8000 TO 9999Count").map(Number);
  income9 = table.getColumn("$10000 TO 14999Count").map(Number);
  income10 = table.getColumn("$15000 TO 19999Count").map(Number);
  income11 = table.getColumn("$20000 TO 24999Count").map(Number);
  income12 = table.getColumn("MT$25000Count").map(Number);

}

function isMouseOverCircle(x, y, radius){ // from petra
  let d = dist(x,y, mouseX-512, mouseY-256);
  if(d <= radius) return true;
  else return false;
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}


function draw() {
  translate(width/2,height/2);
  imageMode(CENTER);
  image(mapimg,0,0);
  var cx = mercX(clon);
  var cy = mercX(clat);
  // console.log(cx);
  // console.log(cy);
  var x0 = mercX(wlon)-cx;
  var y0 = mercY(wlat)-cy;
  // console.log(mouseX);
  // console.log(mouseY);
  var color1 = color(235, 235, 235);
  var color2 = color(235, 0, 0);
  setGradient(280, -240, 200, 20, color1, color2, "X");
  textSize(15);
  noStroke();
  fill(255, 255, 255);
  text("Divorce Ratio", 230,-225);
  text("5%", 280,-200);
  text("40%", 480,-200);

  for (var i = 0; i < countries.length; i++){
    circleColor= map(divPer[i],0.05,0.40,250,0);
    lthbarH = map(ltHighNum[i],0,max(ltHighNum[i],highSNum[i],junColNum[i],bacheNum[i],graduNum[i]),0,120);
    highbarH = map(highSNum[i],0,max(ltHighNum[i],highSNum[i],junColNum[i],bacheNum[i],graduNum[i]),0,120);
    junbarH = map(junColNum[i],0,max(ltHighNum[i],highSNum[i],junColNum[i],bacheNum[i],graduNum[i]),0,120);
    babarH = map(bacheNum[i],0,max(ltHighNum[i],highSNum[i],junColNum[i],bacheNum[i],graduNum[i]),0,120);
    grabarH = map(graduNum[i],0,max(ltHighNum[i],highSNum[i],junColNum[i],bacheNum[i],graduNum[i]),0,120);

    var x = mercX(lon[i])-cx;
    var y = mercY(lat[i])-cy;
    // console.log(lon[i]);
    // console.log(lat[i]);
    console.log(countries[i]);
    console.log(x);
    console.log(y);
    // console.log(divPer[i]);
    // console.log(circleColor);
    // console.log(mercX(wlon));
    // console.log(mercX(wlat));
    // console.log(cx);
    // console.log(cy);
    // console.log(x0);
    // console.log(y0);
    var circleSize = 10;

    if(isMouseOverCircle(x, y, circleSize)){
      circleSize = 20;
      textAlign(CENTER);
      fill("yellow");
      text(countries[i],x,y-12); // show country name

      textSize(30);
      text(countries[i]+':',0,70);
      text((divPer[i]* 100).toFixed(2) + '%',0,110);

      // dis paly edu num
      textSize(15);
      fill(255, 255, 255);
      text((ltHighNum[i]* 100).toFixed(2) + '%', -450,200-lthbarH-4);
      text((highSNum[i]* 100).toFixed(2) + '%', -370,200-highbarH-4);
      text((junColNum[i]* 100).toFixed(2) + '%', -290,200-junbarH-4);
      text((bacheNum[i]* 100).toFixed(2) + '%', -220,200-babarH-4);
      text((graduNum[i]* 100).toFixed(2) + '%', -160,200-grabarH-4);

      // display edu bar
      fill(51, 153, 250);
      noStroke();
      rect(-460, 200-lthbarH, 20, lthbarH); //lt high
      rect(-380, 200-highbarH, 20, highbarH); //high school
      rect(-300, 200-junbarH, 20, junbarH); //junior college
      rect(-230, 200-babarH, 20, babarH); //bachelor
      rect(-170, 200-grabarH, 20, grabarH); //graduate

      fill(235,circleColor,circleColor);
      textSize(10);
      text((divPer[i]* 100).toFixed(2) + '%',x,y+20); // show divorced proportion
      stroke(235,circleColor,circleColor);

    }
    else{
      circleSize = 10;
      stroke('rgba(232,232,232,0.25)');
    }

    line(x0,y0,x,y);  // line between capitals and watshington
    fill(235,circleColor,circleColor);
    ellipse(x,y,circleSize,circleSize);   // captital circles
  }

  // watshington circles
  fill("#7adf80");
  ellipse(x0,y0,20,20);


{ textSize (15); // edu bar
  fill(255, 255, 255);
  text('Divorced people by education',-310,50);

  textFont("Arial");
  fill(51, 153, 250);
  noStroke();

  stroke(255, 255, 255);
  line(-480, 200, -130, 200) //x
  line(-480, 200, -480, 70) //y
  stroke('rgba(255,255,255,0.25)');
  line(-480, 80, -130, 80) //100% high
  line(-480, 110, -130, 110) //75% high
  line(-480, 140, -130, 140) //50% high
  line(-480, 170, -130, 170) //25% high

  // X axis lable
  fill(255, 255, 255);
  noStroke();
  textSize (10);
  textAlign(CENTER);
  text('LT High School', -450,212);
  text('High School', -370,212);
  text('Junior College', -290,212);
  text('Bachelor', -220,212);
  text('Graduate', -160,212);
}

{ textSize (15); // income bar
  fill(255, 255, 255);
  text('Divorced people by income',300,50);

  textFont("Arial");
  fill(51, 153, 250);
  noStroke();

  stroke(255, 255, 255);
  line(130, 200, 480, 200) //x
  line(130, 200, 130, 70) //y
  stroke('rgba(255,255,255,0.25)');
  line(130, 80, 480, 80) //100% high
  line(130, 110, 480, 110) //75% high
  line(130, 140, 480, 140) //50% high
  line(130, 170, 480, 170) //25% high

  // X axis lable
  fill(255, 255, 255);
  noStroke();
  textSize (10);
  textAlign(CENTER);
  text('<$4999', 160,212);
  text('$5000 - $9999', 220,212);
  text('$10000 - $19999', 300,212);
  text('$20000 - $24999', 380,212);
  text('>$25000', 450,212);
}

}
