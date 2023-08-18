import multer from "multer";
// import assets from ''
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./dist/public/users");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage,
});
export { upload };
//# sourceMappingURL=multer.js.map