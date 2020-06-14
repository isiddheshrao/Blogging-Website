var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ALL MIDDLEWARE GOES HERE

var MiddleWareObject = {};


// COMMENT OWNERSHIP MIDDLEWARE
MiddleWareObject.checkCommentOwnership = function(req,res,next){
    // CHECK IF USER IS LOGGED IN
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComm){
            if(err){
                console.log(err)
                req.flash("error","Something went wrong")
                res.redirect("back");
            }else{
                // DOES USER OWN THE COMMENT, IF NOT REDIRECT
                if (foundComm.author.id.equals(req.user._id)){
                    // MOVE AHEAD WITH NEXT CODE AS REQUESTEDs
                    next();
                }else{
                    req.flash("error","You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        });
    }else{
        // takes user back to where they came from
        req.flash("error","You have to be logged in to do that")
        res.redirect("back");
    }
}


// CAMP OWNERSHIP MIDDLEWARE
MiddleWareObject.checkUserOwnership = function(req,res,next){
    // CHECK IF USER IS LOGGED IN
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                console.log(err)
                req.flash("error","Campground not Found")
                res.redirect("back");
            }else{
                // DOES USER OWN THE CAMP, IF NOT REDIRECT
                if (foundCamp.author.id.equals(req.user._id)){
                    // MOVE AHEAD WITH NEXT CODE AS REQUESTEDs
                    next();
                }else{
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        // takes user back to where they came from
        req.flash("error","You need to Login in to do that");
        res.redirect("back");
    }
}


// ADDING FUNCTION MIDDLEWARE TO CHECK USER LOGGEDIN STATUS
MiddleWareObject.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that")
    res.redirect("/login");
}


module.exports = MiddleWareObject