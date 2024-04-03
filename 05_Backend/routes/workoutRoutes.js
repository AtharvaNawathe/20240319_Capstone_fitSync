const express = require('express');
const router = express.Router();

const workoutController = require("../controllers/workoutController")
const { verifyToken} = require("../middlewares/auth");
/**
 * Handles API endpoints related to meal plans and meals.
 *
 * This router provides routes for various meal management operations, including:
 *  - **POST /addmealplans:** Creates a new meal plan. (Handled by `mealController.addMealPlan`)
 *  - **GET /mymeals** (Protected): Retrieves the user's meal plans. Requires a valid JWT token. (Handled by `mealController.getMyMeals`)
 *  - **PUT /updatemeals** (Protected): Updates the status of a meal (e.g., marked as completed). Requires a valid JWT token. (Handled by `mealController.updateMealStatus`)
 *  - **GET /getmeals** (Protected): Retrieves all available meals. Requires a valid JWT token. (Handled by `mealController.getAllMeals`)
 *  - **DELETE /removemeal** (Protected): Deletes a meal plan or meal. Requires a valid JWT token. (Handled by `mealController.removeMeal`)
 *
 * @module mealRoutes
 *
 * @throws {ErrorObject} - If an error occurs during route handling (implementation details may vary).
 */

router.post('/addworkoutplans',verifyToken, workoutController.addWorkoutPlan);
router.get('/myworkouts',verifyToken, workoutController.myWorkouts);
router.put('/updateworkout',verifyToken, workoutController.updateWorkoutStatus);
router.get('/getworkouts',verifyToken, workoutController.getAllWorkouts);
router.delete('/removeworkout',verifyToken, workoutController.removeWorkout);
router.post('/workouthistory', verifyToken,workoutController.moveWorkoutToHistory);
router.get('/getworkouthistory', verifyToken,workoutController.getWorkoutHistory);

module.exports = router;