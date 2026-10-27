const express = require('express');
const app = express();

const bcrypt = require('bcrypt'); //it does 2 things, encryption and decryption  

const jwt=require('jsonwebtoken');

const cookieParser = require('cookie-parser');
app.use(cookieParser()); //to use this do npm i cookie-parser, it reads the cookie

// app.get("/", function (req, res) {
    // res.cookie("name","harsh"); //set the cookie
    // res.send("done");
// )}


// app.get("/", function (req, res) {
    // //(this is for encryption) get the below code from https://www.npmjs.com/package/bcrypt   and it gave the hash $2b$10$2o4EL8P2KTQS.HyIqeQDg.t7qf9bXhQiz8aJnGMMa6LcoLQFZVqpu 
    // bcrypt.genSalt(10, function (err, salt) { //saltrounds=10 //gensalt-generate the salt
    //     bcrypt.hash("lololo", salt, function (err, hash) {
    //         console.log(hash);
    //     });
    // });

    // //this is used for decryption, checking if the password and the hash match or not
//     bcrypt.compare("lololo", "$2b$10$2o4EL8P2KTQS.HyIqeQDg.t7qf9bXhQiz8aJnGMMa6LcoLQFZVqpu", function (err, result) {
//         console.log(result);
//     });
// })

app.get("/",function(req,res){
    let token=jwt.sign({email:"harsh@example.com"},"secret") //we can store any data is this //ye secret ke basis pe ye data encrypt hoga
    console.log(token); //this gives us a very long string
    res.cookie("token",token); //now we send that string to the browser using cookie
    res.send("done");
})

// //for cookies
// app.get("/read", function (req, res) {
//     console.log(req.cookies)
//     res.send("read page");
// })

app.get("/read",function(req,res){
    let data=jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send(data);
});

app.listen(3000);