// cons = require("../../middlewares/auth.js");
const multer = require('multer')
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5242880
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|pdf|xlsx|png)$/)) {
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})

module.exports = app => {
    // const auth = require("../../middlewares/auth");
    const users = require("../../source/orgController/orgUser.controller.js");
  
    var router = require("express").Router();
  
    router.get("/list", users.getUsers);
    router.get("/edit/:id", users.editUser);

    // Save Basic Details
    router.post('/save', upload.fields([
        { name: "image", maxCount: 1 },
      ]), function (req, res, next) {
        users.saveUser(req, res, next)
      });
    // Update Basic Details
    router.put('/update/:id', upload.fields([
        { name: "image", maxCount: 1 },
      ]), function (req, res, next) {
        users.updateUser(req, res, next)
      });

    app.use('/user', router);
  };
  