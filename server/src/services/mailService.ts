import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: Number(SMTP_PORT),
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const sendActivationMail = async (mailTo: string, link: string) => {
	await transporter.sendMail({
		from: SMTP_USER,
		to: mailTo,
		subject: 'Account activation on ' + API_URL,
		text: '',
		html: `
              <div>
                  <h1> To activate account, please follow the link </h1>
                  <a href="${link}">${link}</a>
              </div>
    `,
	});
};
