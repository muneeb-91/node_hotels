const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// Post method for person endpoint
router.post('/signup', async (req, res) =>{
try{
    const data = req.body // req.body contains the parsed data by the body parser

  //Create a new Person document using the mongoose model
  const newPerson = new person(data);

  // Save the new person to the database
  const response = await newPerson.save();
  console.log('Data Successfully Saved!');

  //Generating payload (data in JWT token)
  const payload = {
    id: response.id,
    name: response.username,
    email: response.email
  }

  // Generation of JWT token
  const token = generateToken(payload);
  console.log('Token is: ', token);
  
  res.status(200).json({response: response, token: token});
}catch(err){
  console.log(err);
  res.status(500).json({error: 'Internal Server Error!'});
}
})

// Login Route
router.post('/login', async (req, res) =>{
  try{
    // Extracting username and password from req.body
    const {username, password} = req.body;
    
    // Find the username by username
    const user = await person.findOne({username: username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    // Generate Token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    const token = generateToken(payload);
    res.json({token: token});
  }catch(err){
    console.log(error);
    res.status(500).json({error: 'internal server error'});
  }
})

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) =>{
  try{
    const userData = req.user;
    console.log(userData);
    const userId = userData.id;
    const user = await person.findById(userId);
    res.status(200).json({user});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error!'})
  }
})

// Get Method to see the person data
router.get('/', jwtAuthMiddleware, async(req, res)=>{
  try{
    const data = await person.find();
    console.log('Data fetched!')
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!'});
  }
})

// Parameterized API calls for person
router.get('/:workType', async (req, res) => {
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await person.find({work: workType});
      console.log('Response Fetched!')
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'invalid worktype!'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});
  }
})

router.put('/:id', async (req, res) => {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;
    
    const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Returns the updated document
      runValidators: true // Run Mongoose Validations
    });

    if(!response){
      res.status(404).json({error: 'User not found!'});
    }

    console.log('Data Updated!');
    res.status(200).json(response);
  }catch(err){
    console.log(error);
    res.status(500).json({error: "Internal Server Error!"});
  }
})

router.delete('/:id', async (req, res) =>{
  try{
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);

    if(!response){
      res.status(404).json({error: "User not found!"});
    }
    else{
      console.log("Document is deleted successfully!");
      res.status(200).json(response);
    }
  }catch(err){
    console.log(error);
    res.status(500).json({error: "Internal server error!"});
  }
})


module.exports = router;