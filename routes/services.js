const express = require("express");
const path = require("path");
const multer = require("multer");

const { getServices, getService, deleteService, updateService, addService } = require('../controllers/services');
const { auth } = require("../middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callbackfunc) => {
        callbackfunc(null, 'expressImage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })


router.post('/', auth, addService);
router.get("/", auth, getServices);
router.get("/:id", auth, getService);
router.delete("/:id", auth, deleteService);
router.patch("/:id", auth, updateService);
router.post('/upload', [upload.array('image'), auth], addService)

module.exports = router;