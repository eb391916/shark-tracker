// sharkTracker data from https://sharkresearch.rsmas.miami.edu/education/virtual-learning/tracking-sharks/shred/

const key = 'pk.eyJ1IjoiZWIzOTE5MTYiLCJhIjoiY2ttMHN3azJkMHZtcTJ3cDRhNWJwbW5kZyJ9.kKTg7tvkf0Eev-xWhLqzVQ';

const options = {
  lat: 26.351,
  lng: -79.707,
  zoom: 12,
  style: 'mapbox://styles/eb391916/ckm3p24fw0zuq17o34ydlz3tx',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  sharks = loadTable('sharkTracker.csv', 'csv', 'header');
}


function draw() {
  clear();
  //noFill();
  stroke(255);
  strokeWeight(3);
  const zoom = myMap.zoom();
  const pings = myMap.latLngToPixel(26.351, -79.707);
  ellipse(pings.x, pings.y, 2 * zoom, 2 * zoom);

  if (dist(pings.x, pings.y, mouseX, mouseY) < (zoom * 2) / 2) {
    textSize(25);
    noFill();
    text("first ping", pings.x, pings.y);
    fill(0, 100);
  } else {
    fill(255, 100);
  }



  for (let i = 0; i < sharks.getRowCount(); i++) {
    const latitude = Number(sharks.getString(i, 'shLat'));
    const longitude = Number(sharks.getString(i, 'shLng'));
    const pos = myMap.latLngToPixel(latitude, longitude);

    let place = sharks.getString(i, 'date');

    let size = sharks.getString(i, 'time');
    size = map(size,2.04,10.55,2.04) + myMap.zoom();
    ellipse(pos.x,pos.y,5,5);
    
    if (dist(pos.x,pos.y,mouseX,mouseY) < size) {
      textSize(25);
      text(place,pos.x,pos.y);
    }
  }

  print(zoom);
}

  $(window).bind('resize', function(e) {
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function() {
      this.location.reload(false); /* false to get page from cache */
    }, 200);
  });