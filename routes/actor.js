const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const validations = require("../middleware/validation");

// Routes related to actor.
router.get('/', actorsController.getAllActors);

router.put('/', validations.validateActor, actorsController.updateActor);

router.post('/', validations.validateActor, actorsController.addActor);

router.get('/streak', actorsController.getStreak);

module.exports = router;
