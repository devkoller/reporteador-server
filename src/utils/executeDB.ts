import { cgi } from "@/config"

export async function executeCGI(str: string) {
	try {
		const data = await cgi.sequelize.query(str, {
			// model: cgi.models.panelsCharts,
		})

		return data
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : String(error))
	}
}
