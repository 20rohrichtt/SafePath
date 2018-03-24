let axios = require("axios");
let key = process.env.API_KEY;

function getDirections(start, end) {
  let urlBase = "https://maps.googleapis.com/maps/api/directions/json?";
  urlBase = urlBase + "origin=" + start + "&destination=" + end;
  urlBase += "&mode=walking&alternatives=true&key=" + key;
  console.log(urlBase);
}

let start1 = "416+Monroe+Lane+Charlottesville+VA";
let end1 = "613+Madison+Avenue+Charlottesville+VA";

getDirections(start1, end1);
