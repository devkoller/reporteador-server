class apiError extends Error {
	public statusCode: number

	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
		this.name = "apiError"

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, apiError)
		}
	}
}

export default apiError
