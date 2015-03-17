module.exports = function(Task) {
  Task.afterCreate = function(next) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'Zoho',
      auth: {
        user: 'noreply@colabme.com',
        pass: 'colabme1234'
      }
    });
    
    var self = this;
    
    this.account(function (err, acc) {
      var message = {
        text: "New task \"" + self.name + "\" is assigned to you",
        subject: "Colab-me: new task assigned to you",
        from: "noreply@colabme.com",
        to: acc.email
      }
      
      transporter.sendMail(message, function(error, info) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
      });
      
      next();
    });
  }
};
