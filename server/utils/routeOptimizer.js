const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.status === 'OK') {
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    throw new Error('Geocoding failed');
  }
};

const optimize = async (addresses) => {
  if (addresses.length === 0) return [];

  // Prepare waypoints for Google Directions API
  const origin = addresses[0].address;
  const destination = addresses[addresses.length -1].address;
  const waypoints = addresses.slice(1, -1).map(addr => addr.address);

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=optimize:true|${waypoints.map(encodeURIComponent).join('|')}&key=${GOOGLE_MAPS_API_KEY}&mode=driving`;

  const response = await axios.get(url);
  if (response.data.status === 'OK') {
    const route = response.data.routes[0];
    const optimizedOrder = route.waypoint_order;
    const orderedAddresses = [addresses[0]];
    optimizedOrder.forEach(index => {
      orderedAddresses.push(addresses[index + 1]);
    });
    orderedAddresses.push(addresses[addresses.length -1]);
    return orderedAddresses;
  } else {
    throw new Error('Route optimization failed');
  }
};

module.exports = {
  geocodeAddress,
  optimize
};
