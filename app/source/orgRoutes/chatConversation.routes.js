const authentication = require("../../middlewares/auth.js");

module.exports = app => {
    const auth = require("../../middlewares/auth");
    const chats = require("../../source/orgController/chatConversation.controller.js");
  
    var router = require("express").Router();
  
    router.post("/save",authentication, chats.createChat);
  
    router.get("/list",authentication, chats.getChat);
  
    router.get("/edit/:id",authentication, chats.editChat);
  
    router.put("/update/:id",authentication, chats.updateChat);
  
    router.put("/delete/:id",authentication, chats.deleteChat);
  
    app.use('/chats/',auth, router);
  };
  