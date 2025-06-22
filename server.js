const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store parsed data object in 'req.body'

app.get('/', (req, res) => {
  res.send('Welcome to my hotel!... How can I help you?')
})

// Importing router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Using router files
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});