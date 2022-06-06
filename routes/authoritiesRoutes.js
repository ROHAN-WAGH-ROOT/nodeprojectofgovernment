const express = require("express");
const multer = require("multer");

const { addAuthorities, getAuthorities, getAuthority, deleteAuthority, updatdeAuthority, addImage } = require('../controllers/authoritiesController');
const { auth } = require("../middleware/auth");
const router = express.Router();

const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, callbackfunc) => {
        callbackfunc(null, 'ExpressImage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })

// router.post("/", auth, addAuthorities);
router.get("/", auth, getAuthorities);
router.get("/:id", auth, getAuthority);
router.delete("/:id", auth, deleteAuthority);
router.patch("/:id", auth, updatdeAuthority);
router.post('/upload', [upload.array('image'), auth], addAuthorities)


module.exports = router; 