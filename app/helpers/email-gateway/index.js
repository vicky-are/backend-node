require("dotenv").config();
const test_ = require("../../source/orgConfig/orgTest.config");
const authSender = process.env.SENDGRID_SENDER_EMAIL;
const authSenderName = process.env.SENDGRID_SENDER_NAME;
const authApiKey = process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");

triggerEmailGateway = async (data) => {
  if (test_.email_reset_password) {
    return true;
  }

  if (!authSender || !authApiKey) {
    console.log("Please set sengrid in .env");
    throw TypeError("Please set sengrid in .env");
  }

  try {
    sgMail.setApiKey(authApiKey);
    const response = await sgMail.send(data);
    return response;
  } catch (error) {
    throw TypeError(error.response.body);
  }
};

exports.forgotPassword = async function forgotPassword(data) {
  if (!data.email) {
    throw TypeError("To email is required.");
  }

  const msg = {
    to: data.email,
    from: {
      email: authSender,
      name: authSenderName,
    },
    subject: `${process.env.APP_TITLE} Verification Code`,
    text: `Your verification code is ${data.token}.`,
  };

  const response = await triggerEmailGateway(msg);
  return response;
};

exports.trigger = async function trigger(data) {
  if (!data.emails || !data.subject || !data.message) {
    throw "emails ,subject,message is required.";
  }
  const msg = {
    to: data.emails,
    from: {
      email: authSender,
      name: authSenderName,
    },
    subject: data.subject,
    text: data.message,
  };

  const response = await triggerEmailGateway(msg);
  return response;
};
