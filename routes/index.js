var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req,res){
    res.render("landing");
});


// ADDING AUTHENTICATION ROUTES
router.get("/register", function(req,res){
    res.render("register");
});
// HANDLE SIGNUP LOGIC
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            // err IS AN OBJECT AND HAS MESSAGE AS A PARAMETER COMING FORM PASSPORT AUTH
            req.flash("error",err.message);
            return res.render("register")
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success","You have registered. Welcome" + user.username);
            res.redirect("/campgrounds")
        });
    });
});

// SHOW LOGIN ROUTE
router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
});

// ADDING LOGOUT ROUTE
router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

// export the router

module.exports = router;