const User = require('../models/user_schema');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const WorkoutPlan = require('../models/workout_schema')
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Adds a new workout plan.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const addWorkoutPlan = async (req, res) => {
    try {
        const { goal, workout_loc, workout_name, schedule } = req.body;

        // Check if workout_name, goal, workout_loc, and schedule are provided
        if (!goal || !workout_loc || !workout_name || !schedule) {
            return res.status(400).send('Workout name, goal, workout location, and schedule are required');
        }

        // Check if user is logged in (assuming token is included in request headers)
        let username;
        if (req.headers.authorization) {
            const token = req.headers.authorization // Assuming token is in format: Bearer <token>
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

        // Create a new workout plan
        const newWorkoutPlanData = {
            workout_name,
            goal,
            workout_loc,
            schedule,
            username // Include username in the new workout plan data
        };
        
        // Create a new workout plan
        const newWorkoutPlan = new WorkoutPlan(newWorkoutPlanData);

        // Save the workout plan to the database
        await newWorkoutPlan.save();

        res.status(201).send('Workout plan added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

/**
 * Retrieves all workouts of the logged-in user.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const myWorkouts = async (req, res) => {
    try {
        // Extract the authorization token from the request headers
        const token = req.headers.authorization;

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        // Decode the token to get the username
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedToken.username;

        // Fetch workouts associated with the username
        const workouts = await WorkoutPlan.find({ username });

        // Return the workouts as a response
        res.status(200).json({ workouts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Updates the status of a workout exercise to "completed".
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const updateWorkoutStatus = async (req, res) => {
    try {
        const { exercise_name } = req.body;

        // Check if exercise_name is provided
        if (!exercise_name) {
            return res.status(400).send('Exercise name is required');
        }

        // Find the workout plan containing the exercise
        const workoutPlan = await WorkoutPlan.findOne({ 'schedule.exercises.exercise_name': exercise_name });

        if (!workoutPlan) {
            return res.status(404).send('Workout plan not found');
        }

        // Update the status of the exercise to "completed"
        workoutPlan.schedule.forEach(day => {
            day.exercises.forEach(exercise => {
                if (exercise.exercise_name === exercise_name) {
                    exercise.workout_status = 'completed';
                }
            });
        });

        // Save the updated workout plan
        await workoutPlan.save();

        res.status(200).send('Workout status updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

/**
 * Retrieves all workouts.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const getAllWorkouts = async (req, res) => {
    try {
        // Fetch all workout plans from the database
        const workouts = await WorkoutPlan.find();

        // Check if any workout plans exist
        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found" });
        }

        // Send the list of workouts in the response
        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Removes a workout from the database.
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
const removeWorkout = async (req, res) => {
    try {
        const { workout_name } = req.body;

        // Check if workout_name is provided
        if (!workout_name) {
            return res.status(400).send('Workout name is required');
        }

        // Remove the workout plan from the database
        const deletedWorkout = await WorkoutPlan.findOneAndDelete({ workout_name });

        if (!deletedWorkout) {
            return res.status(404).send('Workout not found');
        }

        res.status(200).send('Workout removed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

  module.exports = {
    addWorkoutPlan,
    myWorkouts,
    updateWorkoutStatus,
    getAllWorkouts,
    removeWorkout
  }