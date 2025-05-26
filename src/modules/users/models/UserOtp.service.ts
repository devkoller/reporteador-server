import { cgi } from "@/config"
const _db = cgi.sequelize
import { Op } from "sequelize"

type genericType = {
	[key: string]: any
}

interface createProps {
	body: genericType
}
interface readProps {
	where: genericType | null
}

interface updateProps {
	id: number
	body: genericType
}

interface deleteProps {
	id: number
}
class UserOtp {
	constructor() {
		this.create = this.create.bind(this)
		this.read = this.read.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create({ body }: createProps) {
		try {
			const db = _db.models.UserOtp
			const item = await db.create(body)
			return item?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async read({ where }: readProps) {
		try {
			const db = _db.models.UserOtp
			const item = await db.findOne({
				where: {
					...where,
				},
			})
			return item?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async update({ id, body }: updateProps) {
		try {
			const db = _db.models.UserOtp
			const item = await db.update(body, {
				where: {
					id,
				},
			})
			return item
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async delete({ id }: deleteProps) {
		try {
			const db = _db.models.UserOtp
			const item = await db.destroy({
				where: {
					id,
				},
			})
			return item
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async validate({
		userID,
		code,
		type,
	}: {
		userID: number
		code: string
		type?: string
	}) {
		try {
			const db = _db.models.UserOtp
			const item = await db.findOne({
				where: {
					userID,
					code,
					type,
					used: false,
					expiresAt: {
						[Op.gt]: new Date(),
					},
				},
			})
			return item?.dataValues ?? null
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new UserOtp()
