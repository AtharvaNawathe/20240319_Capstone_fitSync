const express = require('express');
const router = express.Router();

const mealController = require("../controllers/mealController")
const { verifyToken} = require("../middlewares/auth");


router.post('/addmealplans',mealController.addMealPlan);
router.get('/mymeals',verifyToken,mealController.getMyMeals);
router.put('/updatemeals',verifyToken,mealController.updateMealStatus);
router.get('/getmeals',verifyToken,mealController.getAllMeals);
router.delete('/removemeal',verifyToken,mealController.removeMeal);

module.exports = router;