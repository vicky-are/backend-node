const authentication = require("../../middlewares/auth.js");

module.exports = app => {
    const auth = require("../../middlewares/auth");
    const orgRoles = require("../../source/orgController/orgRoles.controller.js");
  
    var router = require("express").Router();
  
    // Roles
    router.post("/save",authentication, orgRoles.create);
  
    router.get("/list",authentication, orgRoles.findAll);
  
    router.get("/edit/:id",authentication, orgRoles.findOne);
  
    router.put("/update/:id",authentication, orgRoles.update);
  
    router.put("/delete/:id",authentication, orgRoles.delete);

    // Role Permissions
    router.get("/get_role_permission_id/:designation",authentication, orgRoles.getRoleByID);

    router.put("/update_role_permission/:designation",authentication, orgRoles.updateRolePermission);
  
    app.use('/roles/',auth, router);
  };
  