// loops through crime.json and adds in the lat and lon using node-geocoder

let NodeGeocoder = require("node-geocoder");
let crimes = require("./crime.json");

let options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "API_KEY", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

let geocoder = NodeGeocoder(options);

let crimeAddresses = crimes.map(crime => {
  let address = crime.crimeAddress.replace(" BLOCK OF ", " ");
  return address + " Charlottesville, VA";
});

let crimeLatLons = [];

geocoder
  .batchGeocode(crimeAddresses)
  .then(res => {
    res.map(location => {
      let lon = undefined;
      let lat = undefined;

      // if the search was successful, return get them digits
      if (location && location.value && location.value[0]) {
        (lon = location.value[0].longitude), (lat = location.value[0].latitude);
      }
      let locationObj = {
        lon: lon,
        lat: lat
      };
      crimeLatLons.push(locationObj);
    });
    console.log(JSON.stringify(crimeLatLons));
  })
  .catch(err => {
    console.log(err);
  });
