// import the required-npm libraries
const express=require("express");
const cors=require("cors");

// firebase packages
const functions = require('firebase-functions');

// initialise an instance of express and enable cross origin aresourec sharing
const app=express();

// apply the middlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());//enable us to be able to recieve json body from our app

// import out routes
const ninAuthenticateRoute=require("./routes/authentication");
const adminRoute=require("./routes/election");
const candidateRoute=require("./routes/candidates");


// a function to tell us our program works
app.use("/test",(request,response)=>{
    response.end("welcome to vote right API");
})

// a route which we will be using to authenticate API calls for NIN pending our approval
app.use("/authenticate",ninAuthenticateRoute);

// a route for the admin section of our app
app.use("/election",adminRoute);

// route for dealing with candidates
app.use("/candidate",candidateRoute)

// deploy our instance
exports.voteright=functions.https.onRequest(app);
// https://us-central1-voteright-e8208.cloudfunctions.net/voteright