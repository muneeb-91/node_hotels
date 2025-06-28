const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create Person Schema
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password is it has been modified or new
    if(!person.isModified('password')) return next();

    try{
        // salt genration
        const salt = await bcrypt.genSalt(10);

        // hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hashed password
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
})

// Comparing Passwords after hashing
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;