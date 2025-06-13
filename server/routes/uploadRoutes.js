const express = require("express");
const route = express.Router();
const {uploadImageController} = require("../controllers/uploadImageController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

route.get("/upload",auth,upload.single("image"),uploadImageController);

route.post("/upload",auth,upload.single("image"),uploadImageController);

module.exports = route;