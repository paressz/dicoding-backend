const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(receiver, content) {
    const message = {
      from: 'OpenMusic',
      to: receiver,
      subject: 'PUNTEN PAKET',
      text: 'PAKET SAMMPAI',
      attachments: [
        { filename: 'paket.json', content },
      ]
    };
    return this.transporter.sendMail(message);
  }
}

module.exports = Mailer;