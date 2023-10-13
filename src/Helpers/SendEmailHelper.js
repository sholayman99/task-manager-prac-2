const nodemailer = require('nodemailer');


const SendEmailHelper = async(EmailTo,EmailSub,EmailText) =>{
    const transporter = nodemailer.createTransport({
        host:'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions ={
        from:"Task Manager MERN <info@teamrabbil.com>",
        to:EmailTo,
        subject:EmailSub,
        text:EmailText,
    };
    return await transporter.sendMail(mailOptions) ;
}

module.exports = SendEmailHelper ;