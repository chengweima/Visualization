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

function draw() {
  // put drawing code here
  rowHeight = 30;
  background(100);
  textSize(fontHeight);
  rightMargin = 200;
  y = 2*rowHeight;

  linex1 = longestLabelLength + 5;
  linex2 = w-rightMargin;

  for(var i = countries.length-1; i >= 0; i--)
 {
   fill(255);
   noStroke();
   textAlign(RIGHT, CENTER);
   text(countries[i], longestLabelLength, y);
   stroke(255);
   line(linex1,y,linex2,y);
   y = y + rowHeight;
 }
}
