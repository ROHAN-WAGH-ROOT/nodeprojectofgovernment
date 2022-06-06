const express = require('express');
const { userSignUp, getSignUp, signIn } = require('../controllers/signUp');
const router = express.Router();

router.post("/", userSignUp);
router.get("/getSignUp", getSignUp);
router.post("/signIn", signIn);


//auth logout
router.get('/logout', (req, res) => {
    res.send("logout")
})
//auth with google
router.get('/google', (req, res) => {
    res.send("login with google")
})

module.exports = router