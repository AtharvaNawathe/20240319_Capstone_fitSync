const express = require('express');
const router = express.Router();

const workoutController = require("../controllers/workoutController")
const { verifyToken} = require("../middlewares/auth");


router.post('/addworkoutplans',verifyToken, workoutController.addWorkoutPlan);
router.get('/myworkouts',verifyToken, workoutController.myWorkouts);
router.put('/updateworkout',verifyToken, workoutController.updateWorkoutStatus);
router.get('/getworkouts',verifyToken, workoutController.getAllWorkouts);
router.delete('/removeworkout',verifyToken, workoutController.removeWorkout);

module.exports = router;