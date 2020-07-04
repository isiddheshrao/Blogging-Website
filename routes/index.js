var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req,res){
    res.render("landing");
});


// ADDING AUTHENTICATION ROUTES
router.get("/register", function(req,res){
    // ALSO PASSING PAGE VARIABLE FROM EJS LOGIN AND REGISTER PAGE
    res.render("register", {page: 'register'});
});
// HANDLE SIGNUP LOGIC
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username, 
        firstName: req.body.firstname, 
        lastName: req.body.lastname, 
        email: req.body.email, 
        avatar: req.body.avatar});
    // Adding code for admin profile
    if (req.body.adminCode == 'secretcode1234'){
        newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            // err IS AN OBJECT AND HAS MESSAGE AS A PARAMETER COMING FORM PASSPORT AUTH
            // req.flash("error",err.message);
            // Sorting code to show error on first error
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success","You have registered. Welcome" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN ROUTE
router.get("/login", function(req,res){
    res.render("login", {page: 'login'});
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

// USER PROFILE ROUTES
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
            req.flash("error","Something Went Wrong");
            res.redirect("/");
        }else{
            // FINDING BLOGS BY USER TOO TO SHOW ON PROFILE PAGE
            Campground.find().where("author.id").equals(foundUser._id).exec(function(err, camps){
                if(err){
                    console.log(err);
                    req.flash("error","Something Went Wrong");
                    res.redirect("/");
                }else{
                    res.render("users/profile", {user: foundUser, camps: camps});
                }
            });
        }
    });
});


// export the router

module.exports = router;