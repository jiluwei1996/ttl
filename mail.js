var nodemailer = require('nodemailer');

let emailer = {
    transporter: nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '1650302095@qq.com',
            pass: 'efvkuhdzdswsdhch'
        }
    }),
    mailOptions: {
        from: '1650302095@qq.com',
        to: '1650302014@qq.com',
        subject: 'igxe报告',
        text: '为什么总是白给'
    },
    sendEmail: function(option = {}){
        let mailOptions = {...this.mailOptions, ...option}
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = emailer;
