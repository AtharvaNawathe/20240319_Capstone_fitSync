const MealPlan = require("../models/meal_schema");
const MealHistory = require("../models/mealHistory_schema");
const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Adds a meal plan to the database.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const addMealPlan = async (req, res) => {
  try {
    const { mealName, mealType, hour, minute, period, date, foodDescription } =
      req.body;

    let username; // Initialize username variable

    // Check if user is logged in (assuming token is included in request headers)
    if (req.headers.authorization) {
      const token = req.headers.authorization; // Assuming token is in format: Bearer <token>
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        username = decodedToken.username;
      } catch (error) {
        console.error(error);
        // If token verification fails, proceed without including username
      }
    }
    const mealPlan = new MealPlan({
      username,
      mealName,
      mealType,
      mealTime: {
        hour: parseInt(hour),
        minute: parseInt(minute),
        period,
      },
      date: new Date(date),
      foodDescription,
    });

    await mealPlan.save();

    res.status(201).json({
      message: "Meal plan created successfully",
      data: mealPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create meal plan",
      error: error.message,
    });
  }
};

/**
 * Retrieves all meals assigned to the logged-in user.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const getMyMeals = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization; // Assuming token is in format: Bearer <token>

    // Verify the token to extract the username
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const username = decodedToken.username;

    // Fetch the meal plans for the user
    const mealPlans = await MealPlan.find({ username });

    res.status(200).json({ meals: mealPlans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Retrieves all meals not assigned to any user.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const getAllMeals = async (req, res) => {
  try {
    // Fetch all meal plans from the database
    const meals = await MealPlan.find();

    // Check if any meal plans exist
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }

    // Send the list of meals in the response
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Moves a meal plan to meal history.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const moveMealToHistory = async (req, res) => {
  const { mealName } = req.body;

  try {
    // Find the meal plan entry by mealName and activity_name
    const mealPlan = await MealPlan.findOne({ mealName});

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    // Create a new meal history entry with the found meal plan data
    const mealHistoryEntry = new MealHistory({
      ...mealPlan.toObject(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new meal history entry
    await mealHistoryEntry.save();

    // Remove the meal plan entry from mealplans collection
    await MealPlan.findByIdAndDelete(mealPlan._id);

    res.status(200).json({ message: 'Meal plan moved to history successfully' });
  } catch (error) {
    console.error('Error moving meal plan to history:', error);
    res.status(500).json({ message: 'Failed to move meal plan to history', error: error.message });
  }
};

/**
 * Retrieves all meal history entries.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const getMealsHistory = async (req, res) => {
  try {
    // Fetch all meal plans from the database
    const meals = await MealHistory.find();

    // Check if any meal plans exist
    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found" });
    }

    // Send the list of meals in the response
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addMealPlan,
  getMyMeals,
  getAllMeals,
  moveMealToHistory,
  getMealsHistory,
};
