type genericType = {
	[key: string]: any
}
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

import UserService from "./models/User.service"
import PersonService from "./models/Person.service"
import UserOtpService from "./models/UserOtp.service"
import UserPermissionService from "./models/UserPermission.service"
import UserRoleService from "./models/UserRole.service"

interface functionProps {
	body: genericType | null
	query: genericType | null
	params: genericType | null
}

class User {
	public async create({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { user: userData, person: personData } = body

			const encryptedPassword = CryptoJS.AES.encrypt(
				userData.password,
				process.env.PASSWORD_SECRET || "PASSWORD_SECRET"
			).toString()

			const user = await UserService.create({
				body: {
					...userData,
					passwordHash: encryptedPassword,
				},
			} as any)

			if (!user) {
				throw new Error("User not created")
			}

			await PersonService.create({
				body: {
					...personData,
					userID: user.id,
				},
			} as any)

			if (userData.phone) {
				const otp = await UserOtpService.create({
					body: {
						userID: user.id,
						type: "phoneVerification",
						expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutos
					},
				})
				// aquí deberías enviar el OTP via Whatsapp
			}

			return {
				status: 200,
				message: "User created successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async readAll({ query, params }: functionProps) {
		try {
			const { where } = query || {}
			const items = UserService.readAll({
				where: {},
			})
			return {
				status: 200,
				message: "Users read successfully",
				data: items,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async readMe({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { auth } = body

			const user = await UserService.read({ where: { id: auth.id } })
			if (!user) {
				throw new Error("User not found")
			}

			return {
				status: 200,
				message: "User read successfully",
				data: user,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async update({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			return {
				status: 200,
				message: "User update successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async delete({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			return {
				status: 200,
				message: "User delete successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async login({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { username, password, phone, code } = body
			const key = process.env.PASSWORD_SECRET || "PASSWORD_SECRET"

			// Login con email + contraseña
			if (username && password) {
				const user = await UserService.read({ where: { username } })
				if (!user) throw new Error("User not found")

				const bytes = CryptoJS.AES.decrypt(user.passwordHash, key)
				const decrypted = bytes.toString(CryptoJS.enc.Utf8)

				if (decrypted !== password) throw new Error("Invalid password")

				// emitir JWT
				const token = jwt.sign({ id: user.id }, key, { expiresIn: "8h" })
				const firstName = user.Person.firstName
				const lastName1 = user.Person.lastName1
				const lastName2 = user.Person.lastName2
				return {
					status: 200,
					message: "User login successfully",
					data: {
						user: {
							id: user.id,
							username: user.username,
							email: user.email,
							firstName,
							lastName1,
							lastName2,
							fullName: `${firstName} ${lastName1} ${lastName2}`,
						},
						token,
					},
				}
			}

			// Login con teléfono -> primero envío de OTP
			if (phone && !code) {
				const user = await UserService.read({ where: { phone } })
				if (!user) throw new Error("User not found")

				const otp = await UserOtpService.create({
					body: {
						userID: user.id,
						type: "login",
						expiresAt: new Date(Date.now() + 5 * 60 * 1000),
					},
				})
				// envía otp.code por SMS
				return {
					status: 200,
					message: "User login successfully",
					data: {
						user,
						otp,
					},
				}
			}

			// Login con teléfono + OTP
			if (phone && code) {
				const user = await UserService.read({ where: { phone } })
				if (!user) throw new Error("User not found")

				const valid = await UserOtpService.validate({
					userID: user.id,
					code,
					type: "login",
				})
				if (!valid) throw new Error("Invalid OTP")

				const token = jwt.sign({ id: user.id }, key, { expiresIn: "8h" })
				return {
					status: 200,
					message: "User login successfully",
					data: {
						token,
						user,
					},
				}
			}

			throw new Error("Invalid login data")
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async verifyOtp({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID, code } = body

			const otp = await UserOtpService.validate({ userID, code })

			if (!otp) throw new Error("Invalid OTP")

			// Marcar usuario verificado
			await UserService.update({ id: userID, body: { isVerified: true } })

			return {
				status: 200,
				message: "User verified successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async assignRoles({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID, roleID } = body

			await UserRoleService.create({
				body: { userID, roleID },
			})

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async removeRole({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID, roleID } = body

			await UserRoleService.delete({
				where: { userID, roleID },
			})

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async assignPermissions({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID, permissionID } = body

			await UserPermissionService.create({
				body: { userID, permissionID },
			})

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async removePermission({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID, permissionID } = body

			await UserPermissionService.delete({
				where: { userID, permissionID },
			})

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new User()
