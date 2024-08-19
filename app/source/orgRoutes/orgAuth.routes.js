module.exports = app => {
    const auth = require("../../source/orgController/orgAuth.controller.js");
  
    var router = require("express").Router();
  
    router.post("/login", auth.loginOrgAuth);

    router.put("/change_org_password", auth.changeOrgPassword);
  
    app.use("/auth", router);
  };