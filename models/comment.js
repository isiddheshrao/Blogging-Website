var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    // storing details of current logged in user
    createdAt: { type: Date, default: Date.now}, //to get time elapsed from given comment (moment js)
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);