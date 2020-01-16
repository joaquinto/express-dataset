const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
// Route related to delete events

router.delete('/', eventsController.eraseEvents);

module.exports = router;
