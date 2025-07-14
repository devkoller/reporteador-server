type genericType = {
	[key: string]: any
}
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

import UserService from "./services/User.service"
import PersonService from "./services/Person.service"
import UserSession from "./services/UserSession.service"
import Center from "./services/Center.service"
import PermissionsService from "./services/Permissions.service"
import UserPermissionService from "./services/UserPermission.service"
import UserCenterService from "./services/UserCenter.service"
// import UserRoleService from "./models/UserRole.service"

interface functionProps {
	body: genericType | null
	headers: genericType | null
	query: genericType | null
	params: genericType | null
	ip?: string | null
	auth?: genericType | null
}

class User {
	private MAX_INTENTOS = 5
	private BLOQUEO_MINUTOS = 15
	private JWT_EXPIRACION_MIN = 180
	constructor() {
		this.create = this.create.bind(this)
		this.readAll = this.readAll.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.login = this.login.bind(this)
		this.refreshToken = this.refreshToken.bind(this)
		this.refreshPermissions = this.refreshPermissions.bind(this)

		this.readCenters = this.readCenters.bind(this)
		this.readPermissions = this.readPermissions.bind(this)
		this.readUserPermissions = this.readUserPermissions.bind(this)
		this.readUserCenters = this.readUserCenters.bind(this)

		this.assignPermissions = this.assignPermissions.bind(this)
		this.assignRoles = this.assignRoles.bind(this)
		this.assignCenter = this.assignCenter.bind(this)
	}
	async create({ body }: functionProps) {
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

			return {
				status: 200,
				message: "User created successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readAll({ query, params }: functionProps) {
		try {
			const items = await UserService.readAll({
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

	async readMe({ body }: functionProps) {
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

	async update({ body }: functionProps) {
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

	async delete({ body }: functionProps) {
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

	async login({ body, ip, headers }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		if (!headers || !headers["user-agent"]) {
			throw new Error("User-Agent header is required")
		}
		if (!ip) {
			throw new Error("IP address is required")
		}
		try {
			const { username, password } = body
			const userAgent = headers["user-agent"]
			const key = process.env.PASSWORD_SECRET || "PASSWORD_SECRET"
			const JWT_SECRET = process.env.TOKEN_KEY || "TOKEN_KEY"

			const user = await UserService.read({ where: { username } })

			if (!user) throw new Error("User not found")

			if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
				throw new Error(
					`User is locked until ${user.lockoutUntil.toISOString()}`
				)
			}

			const bytes = CryptoJS.AES.decrypt(user.passwordHash, key)
			const decrypted = bytes.toString(CryptoJS.enc.Utf8)

			if (decrypted !== password) {
				let failedLoginAttempts = user.failedLoginAttempts || 0

				await UserService.update({
					id: user.id,
					body: {
						failedLoginAttempts: failedLoginAttempts + 1,
						lockoutUntil:
							failedLoginAttempts >= this.MAX_INTENTOS
								? new Date(Date.now() + this.BLOQUEO_MINUTOS * 60 * 1000)
								: null,
					},
				})

				throw new Error("Invalid password")
			}

			await UserService.update({
				id: user.id,
				body: {
					failedLoginAttempts: 0,
					lockoutUntil: null,
					lastLoginAt: new Date(),
					lastIP: ip,
				},
			})

			await UserSession.delete({
				where: { userID: user.id, ip },
			})

			const payload = {
				id: user.id,
			}

			// emitir JWT
			const token = jwt.sign(payload, JWT_SECRET, {
				expiresIn: `${this.JWT_EXPIRACION_MIN}m`,
			})

			const expiration = new Date(
				Date.now() + this.JWT_EXPIRACION_MIN * 60 * 1000
			)

			await UserSession.create({
				body: {
					userID: user.id,
					token,
					expiration,
					ip,
					userAgent,
				},
			})

			const firstName = user.Person.firstName
			const lastName1 = user.Person.lastName1
			const lastName2 = user.Person.lastName2

			const listUserPermissions = await UserPermissionService.readAll({
				where: { userID: user.id },
			})
			const currentPermissionIds = listUserPermissions.map(
				(permission) => permission.permissionID
			)

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
					permissions: currentPermissionIds,
					token,
				},
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async refreshToken({ body, headers, auth, ip }: functionProps) {
		if (!headers) {
			throw new Error("Body is required")
		}
		if (!body) {
			throw new Error("Body is required")
		}
		if (!auth) {
			throw new Error("Auth is required")
		}

		const oldToken = headers.authorization?.split(" ")[1]

		try {
			const JWT_SECRET = process.env.TOKEN_KEY || "TOKEN_KEY"
			const userAgent = headers["user-agent"]

			if (!oldToken) {
				throw new Error("Token is required")
			}

			await UserSession.delete({
				where: { token: oldToken },
			})

			const payload = {
				id: auth.id,
			}

			const token = jwt.sign(payload, JWT_SECRET, {
				expiresIn: `${this.JWT_EXPIRACION_MIN}m`,
			})

			const expiration = new Date(
				Date.now() + this.JWT_EXPIRACION_MIN * 60 * 1000
			)

			await UserSession.create({
				body: {
					userID: auth.id,
					token,
					expiration,
					ip: ip,
					userAgent,
				},
			})

			// const { userID, code } = body
			// const otp = await UserOtpService.validate({ userID, code })
			// if (!otp) throw new Error("Invalid OTP")
			// // Marcar usuario verificado
			// await UserService.update({ id: userID, body: { isVerified: true } })
			return {
				status: 200,
				message: "User verified successfully",
				data: {
					token,
				},
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async refreshPermissions({ auth }: functionProps) {
		if (!auth) {
			throw new Error("Auth is required")
		}

		try {
			const listUserPermissions = await UserPermissionService.readAll({
				where: { userID: auth.id },
			})
			const currentPermissionIds = listUserPermissions.map(
				(permission) => permission.permissionID
			)

			return {
				status: 200,
				message: "User verified successfully",
				data: currentPermissionIds,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async assignRoles({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			// const { userID, roleID } = body
			// await UserRoleService.create({
			// 	body: { userID, roleID },
			// })
			// return {
			// 	status: 200,
			// 	message: "User updated successfully",
			// }
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async assignPermissions({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { permissions, userID } = body

			const listUserPermissions = await UserPermissionService.readAll({
				where: { userID: userID },
			})
			const currentPermissionIds = listUserPermissions.map(
				(permission) => permission.permissionID
			)

			const toAdd = permissions.filter(
				(id: number) => !currentPermissionIds.includes(id)
			)

			const toRemove = currentPermissionIds.filter(
				(id) => !permissions.includes(id)
			)

			for (const permissionID of toAdd) {
				await UserPermissionService.create({
					body: { userID, permissionID },
				})
			}

			for (const permissionID of toRemove) {
				await UserPermissionService.delete({
					where: { userID, permissionID },
				})
			}

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async assignCenter({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { centers, userID } = body

			const listUserCenter = await UserCenterService.readAll({
				where: { userID: userID },
			})

			const currentCenterIds = listUserCenter.map((center) => center.centerID)

			const toAdd = centers.filter(
				(id: number) => !currentCenterIds.includes(id)
			)

			const toRemove = currentCenterIds.filter((id) => !centers.includes(id))

			for (const centerID of toAdd) {
				await UserCenterService.create({
					body: { userID, centerID },
				})
			}

			for (const centerID of toRemove) {
				await UserCenterService.delete({
					where: { userID, centerID },
				})
			}

			return {
				status: 200,
				message: "User updated successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readCenters({}: functionProps) {
		try {
			const items = await Center.readAll({
				where: {},
			})

			return {
				status: 200,
				message: "Centers read successfully",
				data: items,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readPermissions({}: functionProps) {
		try {
			const permissions = await PermissionsService.readAll({
				where: {},
			})

			return {
				status: 200,
				message: "Permissions read successfully",
				data: permissions,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readUserPermissions({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID } = body

			const permissions = await UserPermissionService.readAll({
				where: { userID },
			})

			return {
				status: 200,
				message: "User permissions read successfully",
				data: permissions,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readUserCenters({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const { userID } = body

			const permissions = await UserCenterService.readAll({
				where: { userID },
			})

			return {
				status: 200,
				message: "User permissions read successfully",
				data: permissions,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new User()
