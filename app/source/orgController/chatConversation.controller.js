const orgDbConfig = require("../orgConfig/orgDb.config.js");
const db2 = require("../orgModel/orgIndex.js");

const path = require("path");
const fs = require("fs");

const Op = db2.Sequelize.Op;
const Moment = require('moment')
var cron = require('node-cron');
let fetch = require('node-fetch'); 

exports.createChat = async (req, res) => {
  try {
    const created_by = req.user.id
    const userID = created_by?.id
    console.log('UserID', userID);
    
    const data = await db2['chatConversation'].create({
      conversation_id: userID,
      user_id: userID,
      messages: req.body.messages,
    });
    let id = data?.dataValues.id

    res.status(200).send({
      status:200,
      message:'Success',
      output:data
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
exports.getChat = async (req, res) => {

  const created_id = req.user.id
  const userID = created_id.id
  console.log('userID', userID);

  const role = req.user.id
  const role_id = role.designation
  console.log('role_id', role_id);

  try {
  
  let thisQuery = ` SELECT c.*, DATE_FORMAT(c.created_at, '%d %b %y - %r') AS created_date, DATE_FORMAT(c.created_at, '%H:%i') AS created_time
  FROM lz_chats as c
  where c.status = 1 `

  const data = await db2.sequelize.query(thisQuery);

    res.status(200).send({
      status:200,
      message:'Success',
      output: data[0]
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
exports.editChat = async (req, res) => {
    try {

    const ID = req.params.id;

    let thisQuery = ` SELECT c.* 
    FROM lz_chats as c
    where c.status = 1 and c.id = ${ID} `

    const data = await db2.sequelize.query(thisQuery);

      res.status(200).send({
        status:200,
        message:'Success',
        output:data[0]
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
};
exports.updateChat = async (req, res) => {
  try {
    const id = req.params.id;

    const dataForm = {
      messages : req.body.messages,
    }

    const num = await db2['chatConversation'].update(dataForm, {
      where: {id: id, status:1}, 
    });


    if (num == 1) {

      res.status(200).send({
        status:200,
        message: "Updated successfully."
      });

    } else {
      res.status(200).send({
        status:404,
        message: `Cannot update with id : ${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
exports.deleteChat = async (req, res) => {

  const created_by = req.user.id
  console.log('created_by', created_by.id);

    try {
      let x = req.params.id
      
      console.log("id111", x);

      let thisQuery  = ` UPDATE lz_chats SET status = 0 `;
          thisQuery += " WHERE id IN (" + x + ") "
          thisQuery += ` and status = 1 `;

      const data = await db2.sequelize.query(thisQuery);

      res.status(200).send({
        status:200,
        message: "Deleted successfully!"
      });
    } 
    catch (error) {
      res.status(500).send({
      message: error.message,
    });
  }
}