const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config(); 
const passport = require('./auth')


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store parsed data object in 'req.body'
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next)=>{
  console.log(`[${new Date()}] Request made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',(req, res) => {
  res.send('Welcome to my hotel!... How can I help you?')
})

// Importing router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Using router files
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});