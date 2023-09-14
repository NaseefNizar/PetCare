import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./dist/public/users");
//   },
//   filename: function (req, file, cb) {
//     cb(null,  Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
// });


const storage = multer.memoryStorage();
const upload = multer({
  storage,
});


export { upload };
