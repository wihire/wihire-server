const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

exports.sendEmail = async (options) => {
  const sendMailData = await this.transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: options.to,
    subject: options.subject,
    text: options?.text,
    html: options?.html,
  });
  return sendMailData;
};
