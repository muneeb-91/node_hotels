// 1. Function

// function add(a, b){
//     return a+b;
// }

// var add = function(a,b){
//     return a+b;
// }

// var add = (a,b) => {return a+b};

// var add = (a, b) => a + b;

// 
//(function(){
//     console.log('Muneeb is added');
// })();



// var result = add(45, 6);
// console.log(`result is: ${result}`);

// console.log(add(4,5));

// 2. Callback Functions
// function callback() {
//     console.log('Callback function has been running successfully!');
// }


// var add = function (a, b, cb) {
//     result = a + b;
//     console.log('result is: ' + result);
//     cb();
// }

// add(6, 7, () => console.log('added callback function'));

// 3. Node Js Libraries
// var fs = require('fs');
// var os = require('os');
// var _ = require('lodash');

//os
// var user = os.userInfo();
// console.log(user.username);

// fs
// fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', ()=> {
//     console.log("file is created")
// });

// console.log(fs) //used to check the functionality of library fs.

//lodash
// var arr = ['person', 'employee', 'employee', 1, 2, 3, 2, 3, 3, 'name', 'person']
// var filter = _.uniq(arr);
// console.log(filter);

// console.log(_.isString(4));


// 4. Import

// const notes = require('./notes.js');
// console.log('This is server file!');

// var age = notes.age;
// var result = notes.addNumber(age+18, 10);

// console.log(age);
// console.log(result);


// 5. JSON and Object 

// 5.1 String to Object
// var jsonString = '{"name": "Muneeb", "age": 22, "city": "Sahiwal"}'
// var jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.city);


// 5.2 Object to String
// var _jsonObject = {
//     name: "Muneeb",
//     age: 22,
//     city: "Sahiwal"
// }

// var _jsonString = JSON.stringify(_jsonObject);
// console.log(_jsonString);
// console.log(typeof(_jsonString));