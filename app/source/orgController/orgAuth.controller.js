const jwt = require("../../helpers/jwt");
const phone_gateway = require("../../helpers/phone-gateway");
const email_gateway = require("../../helpers/email-gateway");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db2 = require("../orgModel/orgIndex.js");
const Op = db2.Sequelize.Op;

const Moment = require('moment')

exports.loginOrgAuth = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(200).send({
        status:401,
        message: "Email & Password required.",
      });
      return;
    }

    var condition = {
      where: {
        [Op.or]: [
          {
            email: req.body.email,
          },
        ], status:1
      },
      // attributes: {exclude: ['createdAt','updatedAt']}
    };

    const data = await db2['user'].findOne(condition);

    if (!data) {
      res.status(200).send({
        status:404,
        message: "Email not found.",
      });
    } else {
      const match = await bcrypt.compare(req.body.password, data.password);
      if (match) {

        let id = data.id;
        let email = data.email;
        let org_id = data.org_id;
        let designation = data.designation;
        const token = jwt.accessTokenEncode(
          {id: id, email, designation},
          'the-super-strong-secrect',
          {
            expiresIn: "24h",
          }
        );

        console.log("tokennnnnnnn", token);

        res.status(200).send({
          status:200,
          message:"success",
          access_token:token,
          refresh_token: jwt.refreshTokenEncode(data.id),
          output: data,
        });

        // res.status(200).send({
        //   status:200,
        //   message:"success",
        //   access_token:token,
        //   refresh_token: jwt.refreshTokenEncode(data.id),
        //   output: data,
        //   language:obj
        // });
      // }
     }else {
        res.status(200).send({
          status:403,
          message: "Incorrect password",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// Organization Change Password
exports.changeOrgPassword = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
      req.body.password = hash;

      const id = req.params.id;

      const userIdFetch = await db2['user'].findOne({
        where: {
          [Op.or]: [
            { email: req.body.email },
            { password: req.body.oldpassword },
          ]
        },
      });

      const match = await bcrypt.compare(req.body.oldpassword, userIdFetch?.dataValues.password);
      console.log("matchhhhhhh", match);

      const user_verification = userIdFetch?.dataValues ? userIdFetch?.dataValues["id"] : 0
      const x = userIdFetch?.dataValues
      console.log('userIdFetchhhhhhhhhh', userIdFetch?.dataValues);
      console.log('user_verificationnnnnnnnnnnn', user_verification);

      console.log('x', x);
      console.log('oldpassword', req.body.oldpassword);
      console.log('password', req.body.password);

      if (match) {
        const data = {
          password: req.body.password
        }
        const num = await db2['user'].update(data, {
          where: { email: req.body.email },
        });
        if (num == 1) {
          res.status(200).send({
            status: 200,
            message: "Updated successfully."
          });
        } else {
          res.status(200).send({
            status: 404,
            message: `Cannot update with id : ${id}.`
          });
        }
      }
      else {
        res.status(200).send({
          status: 400,
          message: `Wrong old password.`
        });
      }
    })
  }
  catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
