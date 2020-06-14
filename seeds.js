// To create seeds file to get random data to work with (test data)
var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Test 1",
        image: "https://preview.redd.it/w3kr4m2fi3111.png?width=960&crop=smart&auto=webp&s=cb8a63a3503af19c337bf19f7e77349056b610da",
        description: "bla bla bla"

    },
    {
        name: "Test 2",
        image: "https://preview.redd.it/w3kr4m2fi3111.png?width=960&crop=smart&auto=webp&s=cb8a63a3503af19c337bf19f7e77349056b610da",
        description: "bla bla bla"

    },
    {
        name: "Test 3",
        image: "https://preview.redd.it/w3kr4m2fi3111.png?width=960&crop=smart&auto=webp&s=cb8a63a3503af19c337bf19f7e77349056b610da",
        description: "bla bla bla"

    }
]


function seedDB(){
    // remove all camps
    campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Removed Camps!");
    // });
    // // adding camps
    // data.forEach(function(seed){
    //     campground.create(seed, function(err,camps){
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log("Camp Added")
    //             // Creating comments
    //             Comment.create({
    //                 text: "This is great. I wish there was internet",
    //                 author: "John Doe"
    //             }, function(err,comment){
    //                 if(err){
    //                     console.log(err)
    //                 }else{
    //                     camps.comments.push(comment);
    //                     camps.save();
    //                     console.log("Created new comment");
    //                 }
    //             })
    //         }
    //     });
    });
}

module.exports = seedDB; 