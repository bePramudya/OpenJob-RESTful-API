import nodemailer from "nodemailer";

class MailSender {
	constructor() {
		this._transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			secure: Number(process.env.MAIL_PORT) === 465,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});
	}

	sendApplicationNotification({
		ownerEmail,
		applicantName,
		applicantEmail,
		appliedAt,
	}) {
		const message = {
			from: `OpenJob <${process.env.MAIL_USER}>`,
			to: ownerEmail,
			subject: "Ada lamaran baru untuk lowongan Anda",
			text: `Lamaran baru diterima untuk lowongan Anda.
            Nama pelamar: ${applicantName}
            Email pelamar: ${applicantEmail}
            Tanggal lamaran: ${appliedAt}`,
		};

		return this._transporter.sendMail(message);
	}
}

export default MailSender;
