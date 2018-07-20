const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./users.js');
const axios = require('axios');
const secret = process.argv[2];

//const mapsKey = "AIzaSyAzShzYVDY-JpgXbGHxBxAz5NBMpvdSt5E";

router.use(cors());
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
// router.use(express.static(__dirname+'/build'));

                User.find({})
                    .then((results) =>
                    {
                        console.log(results);
                    })
                    .catch((error) =>
                    {
                        console.log(error);
                    });

router.post('http://localhost:8080/validtoken', (req, res)=>{
    jwt.verify(req.body.jwt, secret, (error, payload)=>{
        if(!error){
            res.json({error:false, alias: payload.alias});
        }
        else{
            res.json({error:true});
        }
    });
});

router.post('http://localhost:8080/register', (req, res)=>{
    //check if form are filled out as strings
    if(typeof req.body.username === "string" && typeof req.body.password == "string"){
        //checking both forms are filled
        if(req.body.username && req.body.password){
            //removing the blank spaces
            if(req.body.username.trim() && req.body.username.trim().length <= 15){
                //mondoDB method checking DB if username is taken
                User.findOne({username: req.body.username.trim().toLowerCase()})
                    .then((result)=>{
                        if(result){
                            //send error if username is taken
                            res.json({error:true, reason: "username is taken."});
                        }
                        else{
                            //creating an new schema using constructio-like model
                            //if username is not taken
                            const newUser = new User({
                                username : req.body.username.trim().toLowerCase(),
                                password : bcrypt.hashSync(req.body.password, 10),
                                alias: req.body.username.trim()
                            });
                            //saving the protoype of the schema
                            //calling .save() will return a promise from MongoDB
                            newUser.save()
                            .then((results)=>{
                                console.log("Successfully added " + results.alias);
                                const user = {
                                    _id: results._id,
                                    alias: results.alias,
                                    timestamp: Date.now()
                                };
                                //create an experation on the JWT
                                jwt.sign(user, secret , {expiresIn: "4h"}, (error, jwt)=>{
                                    if(!error){
                                        res.json({error: false, jwt:jwt});
                                    }
                                    else{
                                        res.json({error: true})
                                    }
                                });
                            })
                            .catch((error) =>
                            {
                                console.log(error);
                            });
                        }
                    })
                    .catch((error)=>{
                        res.json({error: true});
                    });
                }
                else
                {
                    res.json({error: true, reason: "Please choose a valid username."});
                }
            }
            else{ //error if username is taken
                res.json({error: true, reason: "All fields must be filled out."});
            }
        }
        else { //error if not all fields are filled out
            res.json({error: true});
        }
    });


//if acount is already set, and signing in through the login
router.post('http://localhost:8080/login',(req, res)=>{
if(typeof req.body.userName ==='string' && typeof req.body.password === 'string'){
    //look for the username
    User.findOne({username: req.body.userName.toLowerCase()})
        .then((result)=>{
            if(result){
                if(bcrypt.compareSync(req.body.password, result.password)){
                    const user ={
                        _id: result._id,
                        alias: result.alias,
                        timeStamp: Date.now()
                        }
                        jwt.sign(user, secret, {expiresIn: '4h'} , (error, jwt)=>{
                            if(!error){
                                res.json({error:false, jwt: jwt})
                            }
                            else {
                                res.json({error:true});
                            }
                        })
                }
                else{
                    res.json({error:true})
                }
            }
            else {
                console.log("not found");
                res.json({error: true});
            }
        })
        .catch((error)=>{
            res.json({error:true});  
        });
}
else {
    res.json({error: true});
}
});


module.exports = router;