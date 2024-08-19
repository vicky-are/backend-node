const db2 = require("../orgModel/orgIndex.js");
const Op = db2.Sequelize.Op;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const path = require("path");
const fs = require("fs");

const Moment = require('moment')


// Save Basic Details
exports.saveUser = async (req, res) => {

  await db2.sequelize.query('START TRANSACTION');

  try {
    // const created_by = req.user.id
    // console.log('created_by', created_by.id);
   
    // const organ_id = req.user.id
    // const org_id = organ_id.org_id
    // console.log('organ_id', org_id);

    let image = "";
  
    if (req.files.image) {
      const extension = req.files.image[0]["mimetype"].split('/')[1]
      image = req.files.image[0]["filename"] + '.' + extension
    }

    if (!req.body.email || !req.body.password) {
      res.status(200).send({
        status:400,
        message: "Email & Password required.",
      });
      return;
    }

    var condition = {
      where: {
        [Op.and]: [
          {
            email: req.body.email,
          },
        ],
      },
    };

    const user = await db2['user'].findOne(condition);

    if (user) {
      res.status(200).send({
        status:400,
        message: "Email already in use.",
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
        req.body.password = hash;
        const users = new db2['user']({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          designation: req.body.designation,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          image: image,
        });
        const data = await users.save(users);

        const userID = data.dataValues.id;

        if (req.files.image) {
            const currentPath = path.join(process.cwd(), "uploads", req.files.image[0]["filename"]);
            const destinationPath = path.join(process.cwd(), "uploads/users/image/" + `${userID}`, image);
            const baseUrl = process.cwd() + '/uploads/users/image/' + `${userID}`
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
          message: "Success.",
          output: data,
        });
        await db2.sequelize.query('COMMIT');
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status:500,
      message: error.message,
    });
    await db2.sequelize.query('ROLLBACK');
  }
};
// Users List
exports.getUsers = async (req, res) => {

  try {
    
    let thisQuery = `SELECT us.*, r.role_name as role_name
    FROM lz_user as us   
    left join lz_roles as r on (r.id = us.designation)
    where us.status = 1    
    group by us.id
    `
    const data = await db2.sequelize.query(thisQuery);

    res.status(200).send({
        status:200,
        message: 'Success',
        output:data[0]
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
// Edit
exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;

    let thisQuery = `SELECT us.*, r.role_name as role_name
    FROM lz_user as us   
    left join lz_roles as r on (r.id = us.designation)
    where us.status = 1 and us.id = ${id}
    group by us.id
    `
    const data = await db2.sequelize.query(thisQuery);

    res.status(200).send({
        status:200,
        message: 'Success',
        output:data[0]
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
// Update
exports.updateUser = async (req, res) => {
  try {
    let image = "";
  
    if (req.files.image) {
      const extension = req.files.image[0]["mimetype"].split('/')[1]
      image = req.files.image[0]["filename"] + '.' + extension
    }
    
    const id = req.params.id;
    const user = await db2['user'].findOne({
      where: {id: id},
      // attributes:['id']
    });
    console.log("userrrrr",user);
    const adminId = user?.dataValues ? user?.dataValues.id : 0
    console.log("adminId", adminId);

    const users = await db2['user'].findOne({
      // where: { email:`${req.body.email}`,id : `${adminId}`},
      where: {
        id: {
          [Op.ne]: adminId
        },
        email:`${req.body.email}`,
      },

      attributes:['id', "email"]
    });
    console.log("userssss", users);

    const executives = users?.dataValues ? users?.dataValues.id : 0
    console.log("executivesssss", executives);

    if (executives !== 0) {
      res.status(200).send({
        status:400,
        message: "Email already in use.",
      });
    } else {
    bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
      req.body.password = hash;

      const dob =  Moment.utc(req.body.dob).format('YYYY-MM-DD');
      const date_of_joining =  Moment.utc(req.body.date_of_joining).format('YYYY-MM-DD');

      let data = {};
      if(image) { 
        data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          designation: req.body.designation,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          image: image,
        }
      } else {
        data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          designation: req.body.designation,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
        }
      }

      const num = await db2['user'].update( data, {
        where: { id: id },
      });
    if (num == 1) {

        let userID = req.params.id

        if (req.files.image) {
            const currentPath = path.join(process.cwd(), "uploads", req.files.image[0]["filename"]);
            const destinationPath = path.join(process.cwd(), "uploads/users/image/" + `${userID}`, image);
            const baseUrl = process.cwd() + '/uploads/users/image/' + `${userID}`
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
        message: "Updated successfully."
      });
    } else {
      res.status(200).send({
        status:404,
        message: `Cannot update with id : ${id}.`
      });
    }
  })} } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
// Delete User
exports.deleteUser = async (req, res) => {

  const id = req.params.id;

  try {

    let thisQuery = ` UPDATE lz_user SET status = 0 WHERE id = ${id} `
    const data = await db2.sequelize.query(thisQuery);

    if(data) {

    let thisQueryPC = ` SELECT GROUP_CONCAT(DISTINCT CONCAT (c.id)) as contact_id FROM lz_contacts as c where c.assign_to LIKE ${id} `
    let thisQueryPL = ` SELECT GROUP_CONCAT(DISTINCT CONCAT (c.id)) as lead_id FROM lz_leads as c where c.assign_to LIKE ${id} `
    let thisQueryPP = ` SELECT GROUP_CONCAT(DISTINCT CONCAT (c.id)) as property_id FROM lz_properties as c where c.assign_to LIKE ${id} `
    let thisQueryPT = ` SELECT GROUP_CONCAT(DISTINCT CONCAT (c.id)) as task_id FROM lz_tasks as c where c.assign_to LIKE ${id} `

    const CData = await db2.sequelize.query(thisQueryPC);
    const LData = await db2.sequelize.query(thisQueryPL);
    const PData = await db2.sequelize.query(thisQueryPP);
    const TData = await db2.sequelize.query(thisQueryPT);

    const CID = CData[0][0]?.contact_id?.split(',') ? CData[0][0]?.contact_id?.split(',') : "''"
    const LID = LData[0][0]?.lead_id?.split(',') ? LData[0][0]?.lead_id?.split(',') : "''"
    const PID = PData[0][0]?.property_id?.split(',') ? PData[0][0]?.property_id?.split(',') : "''"
    const TID = TData[0][0]?.task_id?.split(',') ? TData[0][0]?.task_id?.split(',') : "''"

    console.log('CID', CID);
    console.log('LID', LID);
    console.log('PID', PID);
    console.log('TID', TID);

    let thisQueryC = ` UPDATE lz_contacts SET assign_to = 1 WHERE id IN (${CID}) `
    let thisQueryL = ` UPDATE lz_leads SET assign_to = 1 WHERE id IN (${LID}) `
    let thisQueryP = ` UPDATE lz_properties SET assign_to = 1 WHERE id IN (${PID}) `
    let thisQueryT = ` UPDATE lz_tasks SET assign_to = 1 WHERE id IN (${TID}) `

    const dataC = await db2.sequelize.query(thisQueryC);
    const dataL = await db2.sequelize.query(thisQueryL);
    const dataP = await db2.sequelize.query(thisQueryP);
    const dataT = await db2.sequelize.query(thisQueryT);


    let thisQueryGetCS = ` SELECT csm.* , GROUP_CONCAT(DISTINCT CONCAT(csm.contact_setting_id)) as csm_contact_setting_id 
    FROM lz_contact_setting_members as csm 
    LEFT JOIN lz_user as us on (us.id = csm.user_id)
    WHERE csm.user_id IN ('${id}')`
    const dataGetCS = await db2.sequelize.query(thisQueryGetCS);

    console.log('dataGetCS', dataGetCS[0]);

    let thisQueryD = ` DELETE FROM lz_contact_setting_members WHERE user_id IN ('${id}')`
    const dataD = await db2.sequelize.query(thisQueryD);
    console.log('dataCSDel', dataD);

    const csm_conID = dataGetCS[0][0] ? dataGetCS[0][0]?.csm_contact_setting_id : 0
    let ccss = csm_conID?.split(',').map(item => `'${item}'`)?.join(',');
    const DST = ccss ? ccss : "''"
    console.log('csm_conID', csm_conID);

    let thisQueryUP = ` SELECT csm.* , GROUP_CONCAT(DISTINCT CONCAT(csm.user_id)) as csm_user_id
    FROM lz_contact_setting_members as csm 
    LEFT JOIN lz_user as us on (us.id = csm.user_id)
    WHERE csm.contact_setting_id IN (${DST}) GROUP BY csm.contact_setting_id `
    const dataUP = await db2.sequelize.query(thisQueryUP);

    console.log('dataUP', dataUP[0]);
    console.log('dataGetCS', dataGetCS[0]);

    let thisQueryCSDel = ` DELETE FROM lz_contact_setting_members WHERE contact_setting_id IN (${DST})`
    const dataCSDel = await db2.sequelize.query(thisQueryCSDel);
    console.log('dataCSDel', dataCSDel);

    const data = dataUP[0].map(item => {
      item.csm_user_id;
      item.contact_setting_id;
      return {
        CSId :item.contact_setting_id,
        userId :item.csm_user_id,
      }
    })

    const sortLength = dataUP[0].length
    // const loop_user_id = sortLoop.map(item => item.userId)
    console.log("sortLoop", data);
    console.log("sortLength", sortLength);

    // let data = [ { CSId: 1, userId: '2,3,4' }, { CSId: 2, userId: '3,5,6' } ];
    for (let i = 0; i < data.length; i++) {
      let userIds = data[i].userId?.split(',');
      for (let j = 0; j < userIds.length; j++) {
        console.log(`CSId: ${data[i]?.CSId}, userId: ${userIds[j]}`);
        const data1 = await db2['contactSettingMembers'].create({
          contact_setting_id: `${data[i]?.CSId}`,
          user_id:  `${userIds[j]}`,
          sorting_order: j + 1,
      });
      }
    }
  }
    if (data) {
      res.status(200).send({
        status: 200,
        message: "Deleted successfully!"
      });
    } else {
      res.status(200).send({
        status: 404,
        message: `Cannot delete with id : ${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// exports.getUsers = async (req, res) => {

//   const created_id = req.user.id
//   const created_by = created_id.id
//   console.log('created_by', created_by);

//   const organ_id = req.user.id
//   const org_id = organ_id.org_id
//   console.log('organ_id', org_id);

//   const role = req.user.id
//   const role_id = role.designation
//   console.log('role_id', role_id);

//   try {
//     let thisQuery = `SELECT us.*, upd.*, uprd.*, usd.*, ug.*, us.id as id, r.role_name as designation_name, dep.option_value as department_name, us1.first_name as team_leader_name, us2.first_name as portfolio_head_name, us3.first_name as created_by_name FROM lz_user as us   
//     left join lz_users_personal_details as upd on (upd.user_id = us.id)
//     left join lz_users_professional_details as uprd on (uprd.user_id = us.id)
//     left join lz_users_finance as usd on (usd.user_id = us.id)
//     left join lz_users_goals as ug on (ug.user_id = us.id)
//     left join lz_roles as r on (r.id = us.designation)
//     left join lz_masters as dep on (dep.id = us.department)
//     left join lz_user as us3 on (us3.id = us.created_by)
//     left join lz_user as us1 on (us1.id = us.team_leader)
//     left join lz_user as us2 on (us2.id = us.portfolio_head)

//     left join lz_user as us5 on (us.created_by = us5.id) 
//     left join lz_user as us4 on (us5.team_leader = us4.id) 
//     left join lz_user as us6 on (us.created_by = us6.id) 
//     left join lz_user as us7 on (us6.portfolio_head = us7.id)
    
//     where us.status = 1 
//     `
//     if (role_id == 1) {
//       thisQuery += ` `
//     }
//     if (role_id == 5) {
//       thisQuery += ` `
//     }
//     if (role_id == 2) {
//       thisQuery += ` and us.team_leader = ${created_by} or us.portfolio_head = ${created_by} or us.id = ${created_by} `
//       // thisQuery += ` and c.status= 1 and c.created_by = ${created_by} `
//     }
//     if (role_id == 3) {
//       thisQuery += ` and us.team_leader = ${created_by} or us.portfolio_head = ${created_by} or us.id = ${created_by} `
//       // thisQuery += ` and c.status= 1 and c.created_by = ${created_by} `
//     }
//     if (role_id == 4) {
//       thisQuery += ` and us.id = ${created_by} `
//       // thisQuery += ` and c.status= 1 and c.created_by = ${created_by} `
//     }
//     if (role_id >= 6) {
//       thisQuery += ` and us.id = ${created_by} `
//       // thisQuery += ` and c.status= 1 and c.created_by = ${created_by} `
//     }

//     const filters = req.query;

//     thisQuery += ' group by us.id '

//     const data1 = await db2.sequelize.query(thisQuery);

//     if (filters.order_by =="" || filters.order_by == undefined) {
//       thisQuery += '  order by us.id DESC '
//     }

//     if (filters.limit) {
//       thisQuery += ` limit ${filters.limit},12 `
//     }
//     const data = await db2.sequelize.query(thisQuery);

//     const count_filter = (data1[0])

//     res.status(200).send({
//         status:200,
//         message: 'Success',
//         count:count_filter.length,
//         output:data[0]
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
