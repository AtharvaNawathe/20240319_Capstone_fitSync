const MealPlan = require('../models/meal_schema');
const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const addMealPlan = async (req, res) => {
    try {
        const { goal, meal_name, meal_plan } = req.body;

        // Check if goal, meal_name, and meal_plan are provided
        if (!goal || !meal_name || !meal_plan) {
            return res.status(400).json({ message: "Goal, meal name, and meal plan are required" });
        }

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

        // Fetch user from the database based on username
        if (username) {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).send('User not found');
            }
        }

        // Create a new meal plan
        const newMealPlanData = {
            meal_name,
            meal_plan,
            goal,
            username // Include username in the new meal plan data
        };

        const newMealPlan = new MealPlan(newMealPlanData);

        // Save the meal plan to the database
        await newMealPlan.save();

        res.status(201).json({ message: "Meal plan added successfully", mealPlan: newMealPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMyMeals = async (req, res) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization // Assuming token is in format: Bearer <token>
        
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

const updateMealStatus = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).send('Meal name is required');
        }

        // Find the meal plan by meal name and update the status
        const mealPlan = await MealPlan.findOneAndUpdate(
            { 'meal_plan.meals.name': name },
            { $set: { 'meal_plan.$[outer].meals.$[inner].meal_status': 'completed' } },
            { arrayFilters: [{ 'outer.meals.name': name }, { 'inner.name': name }], new: true }
        );

        if (!mealPlan) {
            return res.status(404).send('Meal plan not found');
        }

        res.status(200).send('Meal status updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


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


const removeMeal = async (req, res) => {
    try {
        const { meal_name } = req.body;

        // Check if meal_name is provided
        if (!meal_name) {
            return res.status(400).send('Meal name is required');
        }

        // Remove the meal plan from the database
        const deletedMeal = await MealPlan.findOneAndDelete({ meal_name });

        if (!deletedMeal) {
            return res.status(404).send('Meal not found');
        }

        res.status(200).send('Meal removed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    addMealPlan,
    getMyMeals,
    updateMealStatus,
    getAllMeals,
    removeMeal
};
