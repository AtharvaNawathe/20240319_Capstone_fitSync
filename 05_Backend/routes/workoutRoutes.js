const express = require('express');
const router = express.Router();

const workoutController = require("../controllers/workoutController")
const { verifyToken} = require("../middlewares/auth");

router.post('/addworkoutplans',verifyToken, workoutController.addWorkoutPlan);
router.get('/myworkouts',verifyToken, workoutController.myWorkouts);
router.get('/getworkouts',verifyToken, workoutController.getAllWorkouts);
router.post('/workouthistory', verifyToken,workoutController.moveWorkoutToHistory);
router.get('/getworkouthistory', verifyToken,workoutController.getWorkoutHistory);

module.exports = router;