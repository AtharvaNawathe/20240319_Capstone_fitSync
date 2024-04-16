const express = require("express");
const router = express.Router();

const mealController = require("../controllers/mealController");
const { verifyToken } = require("../middlewares/auth");
/**
 * @typedef {Object} ErrorObject
 * @property {string} message - The error message.
 * @property {number} [statusCode] - The HTTP status code associated with the error (optional).
 */

/**
 * Manages API endpoints for meal plans and meals.
 *
 * This router handles various meal-related operations, including:
 *  - **POST /addmealplans:** Creates a new meal plan. (Handled by `mealController.addMealPlan`)
 *  - **GET /mymeals** (Protected): Retrieves the user's meal plans. Requires a valid JWT token. (Handled by `mealController.getMyMeals`)
 *  - **GET /getmeals** (Protected): Retrieves all available meals. Requires a valid JWT token. (Handled by `mealController.getAllMeals`)
 *
 * @module mealRoutes
 *
 * @throws {ErrorObject} - If an error occurs during route handling (specific implementation details may vary).
 */
router.post("/addmealplans", mealController.addMealPlan);
router.get("/mymeals", verifyToken, mealController.getMyMeals);
router.get("/getmeals", verifyToken, mealController.getAllMeals);
router.post('/mealhistory', verifyToken, mealController.moveMealToHistory);
router.get('/getmealshistory', verifyToken, mealController.getMealsHistory);


module.exports = router;
