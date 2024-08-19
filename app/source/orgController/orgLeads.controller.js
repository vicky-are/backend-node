const orgDbConfig = require("../orgConfig/orgDb.config.js");
const db2 = require("../orgModel/orgIndex.js");

const path = require("path");
const fs = require("fs");

const Op = db2.Sequelize.Op;
const Moment = require('moment')
var cron = require('node-cron');
let fetch = require('node-fetch'); 

exports.saveLeads = async (req, res) => {
  try {
    const created_by = req.user.id
    const userID = created_by?.id
    console.log('UserID', userID);

    let image = "";
  
    if (req.files.image) {
      const extension = req.files.image[0]["mimetype"].split('/')[1]
      image = req.files.image[0]["filename"] + '.' + extension
    }
    
    const data = await db2['leads'].create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      created_by: userID,
      image: image,
    });
    let leadId = data?.dataValues.id

    if (req.files.image) {
      const currentPath = path.join(process.cwd(), "uploads", req.files.image[0]["filename"]);
      const destinationPath = path.join(process.cwd(), "uploads/leads/image/" + `${leadId}`, image);
      const baseUrl = process.cwd() + '/uploads/leads/image/' + `${leadId}`
      fs.mkdirSync(baseUrl, { recursive: true })
      fs.rename(currentPath, destinationPath, function (err) {
        if (err) {
          throw err
        } else {
          console.log("Successfully Profile image Uploaded!")
        }
      });
    }

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
exports.getLeads = async (req, res) => {

  const created_id = req.user.id
  const userID = created_id.id
  console.log('userID', userID);

  const role = req.user.id
  const role_id = role.designation
  console.log('role_id', role_id);

  try {
  
  let thisQuery = ` SELECT l.* 
  FROM lz_leads as l 
  where l.status = 1 `

  if (role_id == 1) {
    thisQuery += ` `
  }
  else {
    thisQuery += ` and l.created_by = ${userID} `
  }

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
exports.editLeads = async (req, res) => {
    try {

    const leadID = req.params.id;

    let thisQuery = ` SELECT l.* FROM lz_leads as l where l.status = 1 and l.id = ${leadID} `

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
exports.updateLeads = async (req, res) => {
  try {
    const id = req.params.id;

    let image = "";
  
    if (req.files.image) {
      const extension = req.files.image[0]["mimetype"].split('/')[1]
      image = req.files.image[0]["filename"] + '.' + extension
    }

    const dataForm = {
      name : req.body.name,
      image : image,
      email : req.body.email,
      phone : req.body.phone,
    }

    const num = await db2['leads'].update(dataForm, {
      where: {id: id, status:1}, 
    });

    
    if (req.files.image) {
      const currentPath = path.join(process.cwd(), "uploads", req.files.image[0]["filename"]);
      const destinationPath = path.join(process.cwd(), "uploads/leads/image/" + `${id}`, image);
      const baseUrl = process.cwd() + '/uploads/leads/image/' + `${id}`
      fs.mkdirSync(baseUrl, { recursive: true })
      fs.rename(currentPath, destinationPath, function (err) {
        if (err) {
          throw err
        } else {
          console.log("Successfully Profile image Uploaded!")
        }
      });
    }

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
exports.deleteLeads = async (req, res) => {
  const organ_id = req.user.id
  const org_id = organ_id.org_id
  console.log('organ_id', org_id);

  const created_by = req.user.id
  console.log('created_by', created_by.id);

    try {
      let x = req.params.id
      
      console.log("id111", x);

      let thisQuery  = ` UPDATE lz_leads SET status = 0 `;
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