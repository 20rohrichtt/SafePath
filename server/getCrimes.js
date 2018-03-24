let spotcrime = require("spotcrime");

// function getCrimes(lat, lon, radius) {
//   let location = {
//     lat: lat,
//     lon: lon
//   };

//   spotcrime.getCrimes(location, radius, (error, crimes) => {
//     if (error) {
//       console.log("ERROR:" + error);
//     } else {
//       console.log(crimes);
//     }
//   });
// }

// getCrimes(33.39657, -112.03422, 0.01);

// somewhere near phoenix, az
var loc = {
  lat: 33.39657,
  lon: -112.03422
};

var radius = 0.01; // this is miles

spotcrime.getCrimes(loc, radius, function(err, crimes) {
  console.log(err);
  console.log(crimes);
});
