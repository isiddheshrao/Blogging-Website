var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

// REQUIRING ALL ROUTES
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

// Creating a Database
// DATABASEURL on heroku. For MONGODB ATLAS
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

app.use(bodyParser.urlencoded({urlencoded:true, extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
// TO USE FLASH MESSAGES ON SCREEN FOR ANY ERROR OR SUCCESS
app.use(flash());

// seedDB(); USE ONLY FOR FALSE SEEDING DB

// ADDING MOMENT CONFIGURATION
app.locals.moment = require('moment');

// Passport Configuration
app.use(require("express-session")({
    secret: "The YelpCamp Secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ADING MIDDLEWARE TO GET USER DATA AND FLASH MESSAGE ON EVERY PAGE
app.use(function(req,res,next){
    // currentUser also used on show page
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// USING ROUTES
app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Blog Server Started.")
});

// app.listen(3000,function(){
//     console.log("Blog Server Started.")
// });
