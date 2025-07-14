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
class Permission {
	constructor() {
		this.create = this.create.bind(this)
		this.read = this.read.bind(this)
		this.readAll = this.readAll.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}

	async create({ body }: createProps) {
		try {
			const db = _db.models.Sigma_Permission
			const item = await db.create(body)
			return item?.dataValues
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async read({ where }: readProps) {
		try {
			const db = _db.models.Sigma_Permission
			const item = await db.findOne({
				include: [
					{
						model: _db.models.Sigma_RolePermission,
						as: "RolePermissions",
						include: [
							{
								model: _db.models.Sigma_UserRole,
								as: "userRole",
								where: {
									userID: where?.userID,
								},
							},
						],
					},
					{
						model: _db.models.Sigma_Resource,
						as: "Resource",
						where: {
							id: where?.resourceID,
						},
					},
				],
			})
			return item?.dataValues
		} catch (error) {
			console.log(
				"🚀 > Permissions.service.ts:70 > Permission > read > error:",
				error
			)
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async readAll({ where }: readProps) {
		try {
			const db = _db.models.Sigma_Permission
			const item = await db.findAll({
				include: [
					{
						model: _db.models.Sigma_Resource,
						as: "Resource",
					},
				],
				where: {
					...where,
				},
			})
			return (
				item?.map((i: any) => {
					let data = i.dataValues
					let resource = data.Resource || {}

					return {
						id: data.id,
						name: resource.name,
						description: resource.description,
						resourceID: data.resourceID,
						resourceName: resource.resource,
						parent: data.parent,
					}
				}) || []
			)
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
	async update({ id, body }: updateProps) {
		try {
			const db = _db.models.Sigma_Permission
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
			const db = _db.models.Sigma_Permission
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

export default new Permission()
