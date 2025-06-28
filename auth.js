const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

// Authentication of user -- through passport package(installed by npm)
passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done)=>{
  try{
    console.log('Received Credentials: ', USERNAME, PASSWORD);
    const user = await person.findOne({username: USERNAME});
    if(!user){
                // error, user, info
      return done(null, false, {message:'Incorrect username!'});
    }
    const isPasswordMatch = await user.comparePassword(PASSWORD);
    if(isPasswordMatch){
      return done(null, user);
    }else{
      return done(null, false, {message: 'Incorrect Password!'})
    }
  }catch (err){
    return done(err);
  }
}))

module.exports = passport;