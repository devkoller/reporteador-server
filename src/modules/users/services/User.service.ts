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
class User {
	constructor() {
		this.create = this.create.bind(this)
		this.read = this.read.bind(this)
		this.readAll = this.readAll.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create({ body }: createProps) {
		try {
			const db = _db.models.Sigma_User
			const item = await db.create(body)
			return item?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async read({ where }: readProps) {
		try {
			const db = _db.models.Sigma_User
			const item = await db.findOne({
				include: [
					{
						model: _db.models.Sigma_Person,
						as: "Person",
						attributes: ["id", "firstName", "lastName1", "lastName2"],
					},
				],
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
			const db = _db.models.Sigma_User
			const item = await db.findAll({
				include: [
					{
						model: _db.models.Sigma_Person,
						as: "Person",
						attributes: ["id", "firstName", "lastName1", "lastName2"],
					},
				],
				where: {
					...where,
				},
			})
			return (
				item?.map((i: any) => {
					let data = i.dataValues
					let firstName: string = data.Person?.firstName || ""
					let lastName1: string = data.Person?.lastName1 || ""
					let lastName2: string = data.Person?.lastName2 || ""

					let fullName = `${firstName} ${lastName1} ${lastName2}`.trim()

					return {
						id: data.id,
						username: data.username,
						fullName: fullName,
						firstName,
						lastName1,
						lastName2,
					}
				}) || []
			)
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
	async update({ id, body }: updateProps) {
		try {
			const db = _db.models.Sigma_User
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
			const db = _db.models.Sigma_User
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
}

export default new User()
