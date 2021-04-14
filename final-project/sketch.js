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
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-40,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiY2hlbmd3ZWltYSIsImEiOiJja213MWdzMnEwYW0xMnZxbnBocWthdmVyIn0.04mlQToUTEG6Ww5cbSn6Dw');
  table = loadTable("data/projectdata_new.csv","csv","header");
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
  countries = table.getColumn("Country Name");
  lat = table.getColumn("CapLat").map(Number);
  lon = table.getColumn("CapLon").map(Number);
  divRate = table.getColumn("Divorce rate").map(Number); //divorced proportion
  gpiPri = table.getColumn("GPI_primary").map(Number); //GPI_primary
  gpiSec = table.getColumn("GPI_secondary").map(Number); //GPI_secondary
  gpiTer = table.getColumn("GPI_tertiary").map(Number); //GPI_tertiary
  marriAge_fe = table.getColumn("marriage_age_female").map(Number); //marriage_age_female
  marriAge_ma = table.getColumn("marriage_age_male").map(Number); //marriage_age_male
  enroll_fe = table.getColumn("enrollment_tertiary_female").map(Number); //enrollment_tertiary_female
  enroll_ma = table.getColumn("enrollment_tertiary_male").map(Number); //enrollment_tertiary_male
  employment_fe = table.getColumn("employment ratio female").map(Number); //employment ratio female
  employment_ma = table.getColumn("employment ratio male").map(Number); //employment ratio male
  income_fe = table.getColumn("GNI per capita(women)").map(Number); //female income
  income_ma = table.getColumn("GNI per capita(men)").map(Number); //male income

  ageDif = table.getColumn("age_difference").map(Number); //age Difference
  incomeDif = table.getColumn("Ratio male to female").map(Number); //income Difference
  employDif = table.getColumn("employment ratio male-female").map(Number); //employment Difference
}

function isMouseOverCircle(x, y, radius){ // from petra
  let d = dist(x+120,y, mouseX-512, mouseY-256);
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
  setGradient(380, -240, 100, 20, color1, color2, "X");
  textSize(15);
  noStroke();
  fill(255, 255, 255);
  text("Divorce Rate", 330,-225);
  text("0", 380,-200);
  text("7", 480,-200);

  for (var i = 0; i < countries.length; i++){
    circleColor= map(divRate[i],0,5,250,0);
    pribarH = map(gpiPri[i],0,max(gpiPri[i],gpiSec[i],gpiTer[i]),0,120);
    secbarH = map(gpiSec[i],0,max(gpiPri[i],gpiSec[i],gpiTer[i]),0,120);
    terbarH = map(gpiTer[i],0,max(gpiPri[i],gpiSec[i],gpiTer[i]),0,120);
    marriAge_fe_barW = map(marriAge_fe[i],0,max(marriAge_fe[i],marriAge_ma[i]),0,70);
    marriAge_ma_barW = map(marriAge_ma[i],0,max(marriAge_fe[i],marriAge_ma[i]),0,70);
    enroll_fe_barW = map(enroll_fe[i],0,max(enroll_fe[i],enroll_ma[i]),0,70);
    enroll_ma_barW = map(enroll_ma[i],0,max(enroll_fe[i],enroll_ma[i]),0,70);
    employment_fe_barW = map(employment_fe[i],0,max(employment_fe[i],employment_ma[i]),0,70);
    employment_ma_barW = map(employment_ma[i],0,max(employment_fe[i],employment_ma[i]),0,70);
    income_fe_barW = map(income_fe[i],0,max(income_fe[i],income_ma[i]),0,70);
    income_ma_barW = map(income_ma[i],0,max(income_fe[i],income_ma[i]),0,70);
    incomeDif_d = map(incomeDif[i],1,2.5,80,140);
    marriAgeDif_d = map(ageDif[i],0,5,80,140);
    employDif_d = map(employDif[i],1,5,80,140);

    var x = mercX(lon[i])-cx;
    var y = mercY(lat[i])-cy;

    // console.log(countries[i]);
    // console.log(x);
    // console.log(y);

    var circleSize = 10;

    if(isMouseOverCircle(x, y, circleSize)){
      circleSize = 20;
      textAlign(CENTER);
      fill("yellow");
      textSize(12);
      text(countries[i],x+120,y-12); // show country name

      textSize(30);
      text(countries[i]+':',0,70);
      text(divRate[i],0,110);

      // display female basic info
      fill('#F5A9F2');
      textSize(10);
      rect(-335,-208+60,marriAge_fe_barW,10);//age
      text(marriAge_fe[i].toFixed(2), -318 + marriAge_fe_barW,-200+60);
      rect(-335,-178+60,enroll_fe_barW,10);//edu
      text(enroll_fe[i].toFixed(2), -318 + enroll_fe_barW,-170+60);
      rect(-335,-148+60,employment_fe_barW,10);//employ
      text(employment_fe[i].toFixed(2), -318 + employment_fe_barW,-140+60);
      rect(-335,-118+60,income_fe_barW,10);//income
      text(income_fe[i], -318 + income_fe_barW,-110+60);

      // display male basic info
      fill('#A9D0F5');
      rect(-405-marriAge_ma_barW,-208+60,marriAge_ma_barW,10);//age
      text(marriAge_ma[i].toFixed(2), -423 - marriAge_ma_barW,-200+60);
      rect(-405-enroll_ma_barW,-178+60,enroll_ma_barW,10);//edu
      text(enroll_ma[i].toFixed(2), -423 - enroll_ma_barW,-170+60);
      rect(-405-employment_ma_barW,-148+60,employment_ma_barW,10);//employ
      text(employment_ma[i].toFixed(2), -423 - employment_ma_barW,-140+60);
      rect(-405-income_ma_barW,-118+60,income_ma_barW,10);//income
      text(income_ma[i], -423 - income_ma_barW,-110+60);

      // dis paly edu num
      textAlign(CENTER);
      textSize(15);
      fill(255, 255, 255);
      text(gpiPri[i].toFixed(2), -450,200-pribarH-4);
      text(gpiSec[i].toFixed(2), -370,200-secbarH-4);
      text(gpiTer[i].toFixed(2), -290,200-terbarH-4);

      // display edu bar
      fill(51, 153, 250);
      noStroke();
      rect(-460, 200-pribarH, 20, pribarH); //pri
      rect(-380, 200-secbarH, 20, secbarH); //sec
      rect(-300, 200-terbarH, 20, terbarH); //ter

      // display differences circle
      fill('rgba(240,240,214,0.8)'); //age
      circle(180,135,marriAgeDif_d);

      fill('rgba(0,177,106,0.8)'); //income
      circle(290,170,incomeDif_d);

      fill('rgba(242,120,75,0.8)'); //employ
      circle(400,135,employDif_d);

      fill('#0000FF');
      textSize(12);
      text('Male ' + ageDif[i].toFixed(2) + ' years older',175,160);
      text('M-F ratio:' + incomeDif[i].toFixed(2),290,190);
      text('M-F ratio:' + employDif[i].toFixed(2),400,160);

      // fill(235,circleColor,circleColor);
      // textSize(10);
      // text(divRate[i],x,y+20); // show divorced proportion
      // stroke(235,circleColor,circleColor);

    }
    else{
      circleSize = 10;
      //stroke('rgba(232,232,232,0.25)');
    }

    //line(x0,y0,x,y);  // line between capitals and watshington
    fill(235,circleColor,circleColor);
    ellipse(x+120,y,circleSize,circleSize);   // captital circles
  }

  // watshington circles
  // fill("#7adf80");
  // ellipse(x0,y0,20,20);

  { textSize (15); // basic info
    fill(255, 255, 255);
    text('Basic Information',-365,-165);

    stroke(255, 255, 255);
    line(-490, -38, -250, -38) //x

    // X axis lable
    fill('#F5A9F2');
    noStroke();
    textSize (10);
    text('Female', -290,-25);

    fill('#A9D0F5');
    noStroke();
    textSize (10);
    text('Male', -450,-25);

    fill(255, 255, 255);
    noStroke();
    textSize (10);
    textAlign(CENTER);
    text('income', -370,-50);
    text('rate %', -370,-73);
    text('employment', -370,-83);
    text('enrollment %', -370,-103);
    text('tertiary edu', -370,-113);
    text('age at mari', -370,-140);
  }


{ textSize (15); // edu bar
  fill(255, 255, 255);
  text('GPI by Education',-360,50);

  stroke(255, 255, 255);
  line(-480, 200, -260, 200) //x
  line(-480, 200, -480, 70) //y
  stroke('rgba(255,255,255,0.25)');
  line(-480, 80, -260, 80) //100% high
  line(-480, 110, -260, 110) //75% high
  line(-480, 140, -260, 140) //50% high
  line(-480, 170, -260, 170) //25% high

  // X axis lable
  fill(255, 255, 255);
  noStroke();
  textSize (10);
  textAlign(CENTER);
  text('Primary', -450,212);
  text('Secondary', -370,212);
  text('Tertiary', -290,212);
}

{ // gender Difference in
  textSize(12);
  fill(255, 255, 255);
  let t1 = 'age get married';
  text(t1,155,120,50,50);

  text('income',290,175);

  let t2 = 'employment rate';
  text(t2,375,120,50,50);

  stroke(255, 255, 255);
  line(110, 220, 510, 220) //x
  // X axis lable
  textFont("Arial");
  fill(255, 255, 255);
  noStroke();
  textSize (15);
  textAlign(CENTER);
  text('Gender differences in the fields of', 310,235);

  stroke('rgba(255,255,255,0.5)');
  noFill();
  circle(180,135,80);
  circle(290,170,80);
  circle(400,135,80);
}

}
