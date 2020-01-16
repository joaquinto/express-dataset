const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const validations = require("../middleware/validation");

// Routes related to event
router.get('/actors/:actorID', validations.validateId, eventsController.getByActor);

router.post('/', validations.validateEvent, eventsController.addEvent);

router.get('/', eventsController.getAllEvents);

module.exports = router;
