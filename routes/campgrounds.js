var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index")
// CAMPGROUND ROUTES

router.get("/", function(req,res){
    // getting all campgrounds from db
    Campground.find({},function(err,allcamps){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/index", {campgrounds:allcamps, currentUser: req.user})      
        }
    });
});

router.post("/new",middleware.isLoggedIn, function(req,res){
    // getting data from form and add data to campground array and then redirect
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {name: name, price:price, image:image, description:description, author:author};
    // adding new camp to database
    Campground.create(newCamp, function(err,newItem){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");
        }
    });
});


router.get("/new",middleware.isLoggedIn ,function(req,res){
    res.render("campgrounds/new");
});

// Adding Show route to show info about each campground
router.get("/:id",function(req,res){
    // getting page id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show",{campground:foundCamp})
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkUserOwnership, function (req,res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkUserOwnership, function(req,res){
    // FINDING AND UPDATING CORRECT CAMPGROUND
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            // REDIRECT
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkUserOwnership, function(req,res){
    // FIND CAMPGROUND BY ID FROM DATABASE AND DELETE
    // THEN REDIRECT TO OTHER PAGE
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});


// export the router

module.exports = router;