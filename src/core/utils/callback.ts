import { Request, Response } from "express"

import { Responses } from "./Responses"

interface callBackProps {
	request: Request
	response: Response
	callback: (request: Request) => Promise<any>
}

const callback = async ({ request, response, callback }: callBackProps) => {
	try {
		const result = await callback(request)

		const resp = new Responses({ ...result })

		if (resp.files) {
			response.status(resp.status).sendFile(resp.getResponse() as string)
		} else if (resp.html) {
			response.status(resp.status).send(resp.getResponse())
		} else {
			response.status(resp.status).send(resp.getResponse())
		}
	} catch (error) {
		console.log("🚀 > callback.ts:26 > callback > error:", error)

		response.status(500).send({
			status: 500,
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : String(error),
		})
	}
}

export default callback
// SequelizeConnectionError
