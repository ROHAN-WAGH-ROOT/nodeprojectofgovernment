const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
require('dotenv').config();
const passport = require('passport');
const expressSession = require('express-session')

// const expressUpload = require('express-fileupload')
const cors = require('cors');
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static('public'));
app.use('/Images', express.static('Images'));
app.use('/expressImage', express.static('expressImage'))
const authoritiesRoutes = require('./routes/authoritiesRoutes');
const serviceRoute = require('./routes/services');
const signUpRoutes = require('./routes/signUp');

const { initializePassport } = require('./passportConfig');


// app.use(expressUpload());
app.use(express.json());
app.use("/authorities", authoritiesRoutes)
app.use("/service", serviceRoute)
app.use("/signUp", signUpRoutes)

//passport authentication
app.use(expressSession({ secret: process.env.TOKEN_KEY, resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());

// setup routes
// app.use('/auth', authRoute)

// app.get("/get-image", (req, res) => {
//     // res.sendFile(path.join(__dirname, "Images/1652858076545.jpg"))
// })

mongoose.connect(process.env.LOCAL_DB, (err) => { err ? console.log("error", err) : console.log("connection established successfully") });
initializePassport(passport);
app.listen(process.env.PORT, () => { console.log("listening on port 7000") });


