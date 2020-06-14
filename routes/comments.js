var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/")

// Comments Routes-----------------------
router.get("/new",middleware.isLoggedIn, function(req,res){
    // find campground by id
    Campground.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: camp});
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comm){
                if(err){
                    console.log(err);
                }else{
                    // ADD USERNAME AND ID TO COMMENT
                    comm.author.id = req.user._id;
                    comm.author.username = req.user.username;
                    // SAVE COMMENT NOW
                    comm.save();
                    camp.comments.push(comm);
                    camp.save();
                    console.log(comm);
                    req.flash("success","Successfully added a comment")
                    res.redirect('/campgrounds/'+ camp._id)
                }
            });
        }
    });
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComm){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComm});
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,UpdatedComm){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// COMMENT DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    // FIND BY ID AND REMOVE
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully deleted the comment")
            res.redirect("/campgrounds/"+req.params.id)
        }
    });
});


//END  Comments Routes-----------------------

// export the router

module.exports = router;