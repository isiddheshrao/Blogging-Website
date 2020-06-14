var mongoose = require("mongoose");


// Setting up schema and defining model
var CampgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            // just saving a reference to the comment
        }
    ]
});

// use module.exports to properly export the model and require it in app.js
module.exports = mongoose.model("Campground", CampgroundSchema);