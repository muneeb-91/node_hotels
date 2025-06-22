const mongoose = require('mongoose');

// 1. Define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' // hotel is the name of database

// 2. Set up mongodb connection
mongoose.connect(mongoURL)

// 3. Get the default connection
// Mongoose mantains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// 4. Define event Listeners for the database connection
db.on('connected', () => {
    console.log("Connected to MongoDB server")
})
db.on('error', () => {
    console.log("Connection Error")
})
db.on('disconnected', () => {
    console.log("MongoDB disconnected")
})

// 5. Export the database connection
module.exports = db;
