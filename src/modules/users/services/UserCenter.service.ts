import { cgi } from "@/config"
const _db = cgi.sequelize
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
class UserCenter {
	constructor() {
		this.create = this.create.bind(this)
		this.read = this.read.bind(this)
		this.readAll = this.readAll.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create({ body }: createProps) {
		try {
			const db = _db.models.Sigma_UserCenter
			const item = await db.create(body)
			return item?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async read({ where }: readProps) {
		try {
			const db = _db.models.Sigma_UserCenter
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

	async readAll({ where }: readProps) {
		try {
			const db = _db.models.Sigma_UserCenter
			const item = await db.findAll({
				where: {
					...where,
				},
			})
			return item?.map((i: any) => i.dataValues) || []
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async update({ id, body }: updateProps) {
		try {
			const db = _db.models.Sigma_UserCenter
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

	async delete({ where }: readProps) {
		try {
			const db = _db.models.Sigma_UserCenter
			const item = await db.destroy({
				where: {
					userID: where?.userID,
					centerID: where?.centerID,
				},
			})
			return item
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new UserCenter()
