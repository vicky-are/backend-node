const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/app/storage/files/");
  },
  filename: (req, file, cb) => {
    let random = Math.floor(Math.random() * 1000000000);
    let extension = /[^.]+$/.exec(file.originalname);
    let filename = random+"."+extension;
    req.title = filename;
    cb(null, req.title);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;