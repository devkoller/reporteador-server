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
class panelsService {
	constructor() {
		this.create = this.create.bind(this)
		this.read = this.read.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create({ body }: createProps) {
		try {
			const db = _db.models.statistisPanels
			const panel = await db.create(body)

			return panel?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async read({ where }: readProps) {
		try {
			const db = _db.models.statistisPanels
			const panel = await db.findAll({
				where: {
					...where,
				},
			})

			return panel?.map((item: any) => item.dataValues)
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async update({ id, body }: updateProps) {
		try {
			const db = _db.models.statistisPanels
			await db.update(body, {
				where: {
					id,
				},
			})

			return
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async delete({ id }: deleteProps) {
		try {
			const db = _db.models.statistisPanels
			await db.destroy({
				where: {
					id,
				},
			})

			return
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new panelsService()
