var w = 1000;
var h = 3300;
var longestLabelLength = 0;

function preload()
{
	table = loadTable("data/Countries-BMI-Data.csv","csv","header");
}

function setup() {
  // put setup code here
  createCanvas(w,h);
  console.log(table.getRowCount() + " total rows in table");
  console.log(table.getColumnCount() + " total columns in table");

  countries = table.getColumn("Country");
  femaleBMI = table.getColumn("Female mean BMI (kg/m2)").map(Number);;
  maleBMI = table.getColumn("Male mean BMI (kg/m2)").map(Number);;

  minBMI = min(min(femaleBMI),min(maleBMI));
  maxBMI = max(max(femaleBMI),max(maleBMI));

  print(minBMI);
  print(maxBMI);

	maleColor = color(57, 219, 255);
	femaleColor = color(224, 80, 223);



  //calculate the length of the longest country label
  textFont('Arial');
  fontHeight = 14;

  textSize(fontHeight);
  longestLabelLength = calculateLongestLabel(countries);

}

function calculateLongestLabel(labels){
  longestLabelLength = 0;
  for(var i = 0; i < labels.length; i++)
  {
	  tw = textWidth(labels[i]);
	  if (tw > longestLabelLength) longestLabelLength = tw;
  }
  return longestLabelLength;
}

function isMouseOverCirlce(cx, cy, radius){
   let d = dist(cx,cy, mouseX, mouseY);
   if (d <= radius) return true;
   else return false;
}

function draw() {
  // put drawing code here

  rowheight = 30;
  background(100);
  textSize(fontHeight);
  rightMargin = 200; //can be adjusted later as needed
  y = 2*rowheight; //leave a bit more space at the top

  //define horizontal line start and end
  linex1 = longestLabelLength + 5;
  linex2 = w-rightMargin;

  //draw the vertical lines
  var i = floor(minBMI);
  var verticalLineLength = y+rowheight * countries.length;

  textAlign(CENTER, BOTTOM);
  while(i <= ceil(maxBMI)){
	  x = map(i,floor(minBMI),ceil(maxBMI),linex1,linex2);
	  stroke(255);
	  line(x,y-rowheight*0.5,x,verticalLineLength);

    fill(255);
    noStroke();
    textSize(fontHeight * 0.7);
    text(i,x,y-rowheight*0.5);

 	  i = i + 1;
  }


  for(var i = countries.length-1; i >= 0; i--)
  {
    fill(255);
    noStroke();
    textAlign(RIGHT, CENTER);
    text(countries[i], longestLabelLength, y);

    //draw the horizontal line
    stroke(255);
    line(linex1,y,linex2,y);

    //get the female and male BMI for the current country
    fbmi = femaleBMI[i];
	  mbmi = maleBMI[i];

    //find the two horizontal positions
    x1 = map(fbmi,floor(minBMI),ceil(maxBMI),linex1,linex2);
	  x2 = map(mbmi,floor(minBMI),ceil(maxBMI),linex1,linex2);

		//strokeWeight(4);
    line(x1,y,x2,y);

		if(isMouseOverCirlce(x1, y, 10)){
			fill(255,0,0);
		}
		else{
	 	fill(femaleColor);
		}

		noStroke();
		circle(x1,y,10);

		fill(maleColor);
		noStroke();
		circle(x2,y,10);
    //strokeWeight(1);

    y = y+rowheight;
  }
}
