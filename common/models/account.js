module.exports = function(Account) {
	Account.afterRemote('**', function(ctx, instance, next) {

		if (ctx.method.name != '__link__accounts') {

		  next();

		  return;

		}
		
		var nodemailer = require('nodemailer');
		var transporter = nodemailer.createTransport({

		  service: 'Zoho',

		  auth: {

			user: 'noreply@colabme.com',

			pass: 'colabme1234'

		  }

		});
		
	});
};
