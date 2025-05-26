import panelsService from "./panels/panels.service"
import { statistisPanelsAttributes } from "./panels/statistisPanels.model"
import { executeCGI } from "@/utils"
import { DuckDB } from "@/core"

type genericType = {
	[key: string]: any
}

interface functionProps {
	body: genericType | null
	query: genericType | null
	params: genericType | null
}

class Panels {
	public async create({ body }: functionProps) {
		if (!body) {
			throw new Error("Body is required")
		}
		try {
			const panel = await panelsService.create({ body })

			return {
				status: 200,
				message: "Panels created successfully",
				data: {
					id: panel.id,
				},
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async readAll({ query, params }: functionProps) {
		try {
			const panels = await panelsService.read({ where: query })

			if (!panels || panels.length === 0) {
				return {
					status: 200,
					message: "Panels not found",
					data: [],
				}
			}

			let data = panels.map((item: statistisPanelsAttributes) => {
				return {
					id: item.id,
					name: item.name,
					description: item.description,
					icon: item.icon,
					color: item.color,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}
			})

			return {
				status: 200,
				message: "Panelss read successfully",
				data: data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async readOne({ query, params }: functionProps) {
		try {
			const { id } = params || {}
			if (!id) {
				throw new Error("Id is required")
			}

			const panel = await panelsService.read({ where: { id } })

			return {
				status: 200,
				message: "Panels read successfully",
				data: panel,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	public async readInfoPanel({ params }: functionProps) {
		try {
			const { id } = params || {}
			if (!id) {
				throw new Error("Id is required")
			}

			const panels = await panelsService.read({ where: { id } })
			if (!panels || panels.length === 0) {
				return {
					status: 200,
					message: "Panels not found",
					data: [],
				}
			}

			const ventas = [
				{ fecha: "2025-05-10", region: "Norte", total: 1300 },
				{ fecha: "2025-05-10", region: "Sur", total: 1100 },
			]

			await DuckDB.saveQueryResult("ventas", ventas)

			const resumen = await DuckDB.readQueryResult(
				"ventas",
				"SELECT * FROM ventas where total > 1200"
			)
			console.log(resumen)

			const panel = panels[0]
			// const db = DuckDB.readQueryResult(`table_${panel.id}`)

			// console.log(
			// 	"🚀 > panels.controller.ts:108 > Panels > readInfoPanel > db:",
			// 	db
			// )
			return {
				status: 200,
				message: "Panels read successfully",
				data: panel,
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
			const { id } = body || {}
			if (!id) {
				throw new Error("Id is required")
			}
			const panel = await panelsService.update({ id, body })

			return {
				status: 200,
				message: "Panels update successfully",
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
			const { id } = body || {}

			if (!id) {
				throw new Error("Id is required")
			}

			const panel = await panelsService.delete({ id })

			return {
				status: 200,
				message: "Panels delete successfully",
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new Panels()
