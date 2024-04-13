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
 * Updates the status of a meal to "completed".
 * while tracking the progress if user has consumed a meal status will be updated
 * to completed
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const updateMealStatus = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if name is provided
    if (!name) {
      return res.status(400).send("Meal name is required");
    }

    // Find the meal plan by meal name and update the status
    const mealPlan = await MealPlan.findOneAndUpdate(
      { "meal_plan.meals.name": name },
      {
        $set: { "meal_plan.$[outer].meals.$[inner].meal_status": "completed" },
      },
      {
        arrayFilters: [{ "outer.meals.name": name }, { "inner.name": name }],
        new: true,
      }
    );

    if (!mealPlan) {
      return res.status(404).send("Meal plan not found");
    }

    res.status(200).send("Meal status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
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
 * Removes a meal from a user's meal plan.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const removeMeal = async (req, res) => {
  try {
    const { meal_name } = req.body;

    // Check if meal_name is provided
    if (!meal_name) {
      return res.status(400).send("Meal name is required");
    }

    // Remove the meal plan from the database
    const deletedMeal = await MealPlan.findOneAndDelete({ meal_name });

    if (!deletedMeal) {
      return res.status(404).send("Meal not found");
    }

    res.status(200).send("Meal removed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const moveMealToHistory = async (req, res) => {
  try {
    const { meal_name, meal_type } = req.body;

    // Find the meal entry in MealPlan based on meal_name
    const mealPlan = await MealPlan.findOne({ meal_name });

    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    // Find the meal plan entry for the provided meal type
    const mealTypeEntryIndex = mealPlan.meal_plan.findIndex(
      (entry) => entry.meal_type === meal_type
    );

    if (mealTypeEntryIndex === -1) {
      return res
        .status(404)
        .json({ message: "No meal found for the provided type" });
    }

    // Get the meals for the provided meal type
    const mealsToRemove = mealPlan.meal_plan[mealTypeEntryIndex].meals;

    // Create a new document to insert in MealHistory collection
    const newMealHistoryEntry = {
      meal_name: mealPlan.meal_name,
      meal_plan: [
        {
          meal_type: mealPlan.meal_plan[mealTypeEntryIndex].meal_type,
          meals: mealsToRemove,
        },
      ],
    };

    // Find and replace the existing document if it exists, otherwise insert a new one
    await MealHistory.findOneAndReplace(
      { meal_name: newMealHistoryEntry.meal_name },
      newMealHistoryEntry,
      { upsert: true }
    );

    // Remove the entire meal type's data structure from the meal plan
    mealPlan.meal_plan.splice(mealTypeEntryIndex, 1);

    await mealPlan.save();

    res
      .status(200)
      .json({
        message:
          "Meal data moved to history and entire meal type's data removed from meal plan successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
  updateMealStatus,
  getAllMeals,
  removeMeal,
  moveMealToHistory,
  getMealsHistory,
};
