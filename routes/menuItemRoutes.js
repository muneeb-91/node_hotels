const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// Post method for menu items endpoint
router.post('/', async (req, res) => {
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log('Item has been successfully saved in the menu!');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!'})
  }
})

// Get Method to see the Menu Items data
router.get('/', async(req, res) => {
  try{
      const data = await MenuItem.find();
      console.log('Data Fetched Successfully!');
      res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!'})
  }
})

// Parameterized API call
router.get('/:taste', async (req, res) => {
  try{
    const taste = req.params.taste;
    if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
      const response = await MenuItem.find({taste: taste});
      console.log('Data Fetched Successfully!');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid Taste!'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!'})
  }
})

module.exports = router;