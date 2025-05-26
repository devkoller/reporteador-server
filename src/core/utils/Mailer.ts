import { createTransport } from "nodemailer"

interface IMailerOptions {
	from: string
	to: string
	subject: string
	html: string
	attachments?: any
}

class Mailer {
	user: string
	password: string
	host: string
	constructor() {
		this.user = process.env.EMAIL_USER || ""
		this.password = process.env.EMAIL_PASSWORD || ""
		this.host = process.env.EMAIL_HOST || ""

		this.sendEmail = this.sendEmail.bind(this)
		this.sendEmail3 = this.sendEmail3.bind(this)
		this.sendEmail4 = this.sendEmail4.bind(this)
	}

	async sendEmail(emailOptions: IMailerOptions) {
		try {
			let transporter = createTransport({
				service: "gmail",
				auth: {
					user: this.user,
					pass: this.password,
				},
			})

			let info = await transporter
				.sendMail(emailOptions)
				.catch((error: any) => {
					throw new Error(error)
				})
			console.log("🚀 ~ Mailer1 ~ info ~ info:", info)

			if (!info.accepted) {
				this.sendEmail3(emailOptions)
			}

			return info
		} catch (error) {
			console.log("🚀 > Mailer.ts:48 > Mailer > sendEmail > error:", error)
			this.sendEmail3(emailOptions)
		}
	}

	async sendEmail3(emailOptions: IMailerOptions) {
		try {
			let transporter = createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMAIL_USER1,
					pass: process.env.EMAIL_PASSWORD1,
				},
			})

			let info = await transporter
				.sendMail(emailOptions)
				.catch((error: any) => {
					throw new Error(error)
				})

			if (!info.accepted) {
				this.sendEmail4(emailOptions)
			}

			return info
		} catch (error) {
			this.sendEmail4(emailOptions)
		}
	}

	async sendEmail4(emailOptions: IMailerOptions) {
		try {
			let transporter = createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMAIL_USER2,
					pass: process.env.EMAIL_PASSWORD3,
				},
			})

			let info = await transporter
				.sendMail(emailOptions)
				.catch((error: any) => {
					throw new Error(error)
				})

			if (!info.accepted) {
				throw new Error("Email not sent")
			}

			return info
		} catch (error) {
			throw new Error("Email not sent")
		}
	}
}

export default new Mailer()
