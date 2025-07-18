import { cgi } from "@/config"
const _db = cgi.sequelize
import { QueryTypes } from "sequelize"

class Data {
	async read(query: string, replacements?: any) {
		try {
			const data = _db.query(query, {
				type: QueryTypes.SELECT,
				replacements,
			})

			return data
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new Data()
