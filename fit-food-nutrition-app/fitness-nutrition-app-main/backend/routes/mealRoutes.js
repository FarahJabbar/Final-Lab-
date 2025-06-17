const express = require('express');
const mealController = require('../controllers/mealController');

const router = express.Router();

router.post('/', mealController.createMeal);
router.get('/:userId', mealController.getMealsByUserId);

module.exports = router;
