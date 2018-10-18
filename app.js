const yargs = require('yargs');
const axios = require('axios');


var wedRes;
var geoLoc;
var lat;
var lng;
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=wnVZLMTICCKY3Sc4aZLyryjjmFrcLOQL&location=${encodedAddress}`;

return axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  geoLoc = response.data;
   lat = response.data.results[0].locations[0].latLng.lat;
   lng = response.data.results[0].locations[0].latLng.lng;
  var weatherUrl = `https://api.darksky.net/forecast/bc5ef75e2e5f0b731e4574d01fe00ae2/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  wedRes = response.data;
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var picLoc = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c11bf5d4dd61901c8e1fb260bf4a1ad0&content_type=screenshot&lat=${lat}&lon=${lng}&format=json&nojsoncallback=1`;
   return axios.get(picLoc);
}).then((response)=>{
     console.log(JSON.stringify(response.data,undefined,2))
      console.log(JSON.stringify(wedRes, undefined,2));
  console.log(JSON.stringify(geoLoc,undefined,2));

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
