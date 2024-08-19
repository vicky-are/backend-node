const authentication = require("../../middlewares/auth.js");

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
    const auth = require("../../middlewares/auth.js");
    const orgLeads = require("../../source/orgController/orgLeads.controller.js");
  
    var router = require("express").Router();
  
    // router.post("/save", authentication, orgLeads.saveLeads);

    router.post('/save', authentication, upload.fields([
      { name: "image", maxCount: 1 },
    ]), function (req, res, next) {
      orgLeads.saveLeads(req, res, next)
    });
  
    router.get("/list", authentication, orgLeads.getLeads);
  
    router.get("/edit/:id", authentication, orgLeads.editLeads);
  
    // router.put("/update/:id", authentication, orgLeads.updateLeads);

    router.put('/update/:id', authentication, upload.fields([
      { name: "image", maxCount: 1 },
    ]), function (req, res, next) {
      orgLeads.updateLeads(req, res, next)
    });
  
    router.put("/delete/:id", authentication, orgLeads.deleteLeads);
  
    app.use('/orgLeads/',auth, router);
  };