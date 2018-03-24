let crime1 = require("./crime.json");
let crime2 = require("./crime2.json");

let finalCrimes = [];

for (let i = 0; i < crime1.length; i++) {
  let address = crime1[i].crimeAddress.replace("BLOCK OF ", "");
  let crimeObj = {
    lon: crime2[i].lon,
    lat: crime2[i].lat,
    type: crime1[i].crimeType,
    address: address,
    date: crime1[i].crimeDate
  };
  finalCrimes.push(crimeObj);
}

console.log(JSON.stringify(finalCrimes));
