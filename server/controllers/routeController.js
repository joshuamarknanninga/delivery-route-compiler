const Address = require('../models/Address');
const routeOptimizer = require('../utils/routeOptimizer');

exports.addAddress = async (req, res) => {
  try {
    const { address, status } = req.body;
    // Geocode the address to get lat and lng
    const geocoded = await routeOptimizer.geocodeAddress(address);
    const newAddress = new Address({
      address,
      lat: geocoded.lat,
      lng: geocoded.lng,
      status
    });
    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).send('Server Error');
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).send('Server Error');
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).send('Server Error');
  }
};

exports.optimizeRoute = async (req, res) => {
  try {
    const { addresses } = req.body;
    const optimized = await routeOptimizer.optimize(addresses);
    res.json(optimized);
  } catch (error) {
    console.error('Error optimizing route:', error);
    res.status(500).send('Server Error');
  }
};
