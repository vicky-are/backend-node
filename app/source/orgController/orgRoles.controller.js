// const orgdb2Config = require("../orgConfig/orgdb2.config.js");
const db2 = require("../orgModel/orgIndex.js");
const Op = db2.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    
    const data = await db2['roles'].create({
      role_name: req.body.role_name,
    });
    const dataID = data?.dataValues.id
    console.log('dataID', dataID);

    const data1 = await db2['rolesPermissions'].create({
      designation: dataID,
    });

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
exports.findAll = async (req, res) => {
  try {
  
  let thisQuery = ` SELECT rol.*, rp.list_ as list_, rp.save_ as save_, rp.update_ as update_ , rp.delete_ as delete_
  FROM lz_roles as rol
  LEFT JOIN lz_role_permissions as rp on (rp.designation = rol.id)
  WHERE rol.status
  GROUP BY rol.id
  `
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
exports.findOne = async (req, res) => {
  try {

    const id = req.params.id;
    const data = await db2['roles'].findAll({
      where: {
          id: id, status:1
        },
      attributes: {exclude :['createdAt','updatedAt']}
    }
      );
    if (data) {
      res.status(200).send({
        status:200,
        message:'Success',
        output:data
        });
    } else {
      res.status(200).send({
        status:404,
        message: `Cannot find with id : ${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    const num = await db2['roles'].update(req.body, {
      where: {
        id: {
          [Op.ne]: 1
        }, id:id
    },
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
exports.delete = async (req, res) => {
  const RoleData = {
    status: 0,
  }
  try {
    const id = req.params.id;

    console.log("id111", id);
    const num = await db2['roles'].update(RoleData, {
      where: {
        id: {
          [Op.ne]:1
        }, id:id
    },
    });
    if (num == 1) {
      res.status(200).send({
        status:200,
        message: "Deleted successfully!"
      });
    } else {
      res.status(200).send({
        status:404,
        message: `Cannot delete with id : ${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


// Role Permissions
exports.getRoleByID = async (req, res) => {
  try {
    const organ_id = req.user.id
    const org_id = organ_id.org_id
    console.log('organ_id', org_id);

    const id = req.params.id;
    const designation = req.params.designation;
    let thisQuery = ` SELECT rp.*, r.role_name as role_name FROM lz_role_permissions as rp
    LEFT JOIN lz_roles as r on (r.id = rp.designation)
    where rp.designation = ${designation}
    `
    const data = await db2.sequelize.query(thisQuery);

    if (data) {
      res.status(200).send({
        status:200,
        message:'Success',
        output:data[0]
        });
    } else {
      res.status(200).send({
        status:404,
        message: `Cannot find with role : ${iddesignation}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
exports.updateRolePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const designation = req.params.designation;
    console.log("designation", designation);
    // const data = {
    //   contact : req.body.contact,
    //   lead : req.body.lead,
    //   project : req.body.project,
    //   task : req.body.task,
    //   transaction : req.body.transaction,
    //   file : req.body.file,
    //   finance : req.body.finance,
    //   message : req.body.message,
    //   reports : req.body.reports,
    // }

    const data = {
      [req.body.module]: req.body.val,
    }

    const num = await db2['rolesPermissions'].update(data, {
      where: {
        designation:designation
    },
    });
    if (num == 1) {
      res.status(200).send({
        status:200,
        message: "Updated successfully."
      });
    } else {
      res.status(200).send({
        status:404,
        message: `Cannot update with role : ${designation}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};