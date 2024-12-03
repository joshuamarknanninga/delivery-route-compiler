const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// CRUD operations for addresses
router.post('/addresses', routeController.addAddress);
router.get('/addresses', routeController.getAddresses);
router.put('/addresses/:id', routeController.updateAddress);

// Route optimization
router.post('/optimize', routeController.optimizeRoute);

module.exports = router;
