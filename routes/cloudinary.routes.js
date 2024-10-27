const express = require("express");
const router = express.Router();
const uploader = require("../middlewares/cloudinary.config");



// POST "/api/upload"
// router.post("/", uploader.single("image"), (req, res, next) => {
//   // console.log("file is: ", req.file);

//   if (!req.file) {
//     // this will happend if cloudinary rejects the image for any reason
//     res.status(400).json({
//       errorMessage: "There was a problem uploading the image. Check image format and size."
//     })
//     return;
//   }

//   // get the URL of the uploaded file and send it as a response.
//   // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend (response.data.imageUrl)

//   res.json({ imageUrl: req.file.path });
// });

// Define the upload route
router.post('/', uploader.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Handle other errors
    return res.status(500).json({ message: 'An error occurred during the upload' });
  }
  next();
});

module.exports = router;