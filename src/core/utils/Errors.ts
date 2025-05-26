type ErrorName =
	| "SequelizeConnectionError"
	| "SequelizeDatabaseError"
	| "UnknownError"
	| "Resource not found"

interface ErrorProps {
	name: string
	message?: string
	status?: number
	stringMove?: string
	module?: string
	move?: string
	id_modified?: number
}

export class Errors extends Error {
	status: number
	stringMove?: string
	module?: string
	move?: string
	id_modified?: number
	constructor({
		name,
		message,
		status,
		stringMove,
		module,
		move,
		id_modified,
	}: ErrorProps) {
		super()
		this.name = name
		this.message =
			status === 500 ? "Ha ocurrido un error inesperado" : message || ""
		this.status = status || 500
		this.stringMove = stringMove || ""
		this.module = module || ""
		this.move = move || ""
		this.id_modified = id_modified || 0
	}
}
