interface ResponsesProps {
	name: string
	message?: string
	status: number
	data?: any
	cause?: any
	files?: string
	html?: string
	stringMove?: string
	module?: string
	move?: string
	id_modified?: number
}

export class Responses {
	name: string
	message: string
	status: number
	data: any
	cause: any
	files: string | null
	html: string | null
	stringMove?: string
	module?: string
	move?: string
	id_modified?: number
	codeStatus: { [key: number]: string }
	codeMessage: { [key: number]: string }
	constructor({
		name,
		message,
		status,
		data,
		cause,
		files,
		html,
		stringMove,
		module,
		move,
		id_modified,
	}: ResponsesProps) {
		this.name = name
		this.message = message || ""
		this.status = status
		this.data = data
		this.cause = cause
		this.files = files || null
		this.html = html || null
		this.stringMove = stringMove || ""
		this.module = module || ""
		this.move = move || ""
		this.id_modified = id_modified || 0
		this.codeStatus = {
			// information responses
			100: "Continue",
			101: "Switching Protocol",
			// successful responses
			200: "OK",
			201: "Created",
			202: "Accepted",
			203: "Non-Authoritative Information",
			204: "No Content",
			205: "Reset Content",
			206: "Partial Content",
			// Redirection messages
			300: "Multiple Choice",
			301: "Moved Permanently",
			302: "Found",
			303: "See other",
			304: "Not Modified",
			307: "Temporally Redirect",
			308: "Permanent Redirect",
			// Client error responses
			400: "Bad Request",
			401: "Unauthorized",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Payload Too Large",
			414: "URI Too Long",
			415: "Unsupported Media Type",
			416: "Range Not Satisfiable",
			417: "Expectation Failed",
			418: "Im a teapot",
			421: "Misdirected Request",
			425: "Too Early",
			426: "Upgrade Required",
			428: "Precondition Require",
			429: "Too Many Request",
			431: "Request Header Fields Too Large",
			451: "Unavailable For Legal Reasons",
			// serve error responses
			500: "Internal Server Error",
			501: "Not Implemented",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			508: "Loop Detected",
			510: "Not Extended",
			511: "Network Authentication Require",
		}
		this.codeMessage = {
			// information responses
			100: "Continue",
			101: "Switching Protocol",
			// successful responses
			200: "",
			201: "New resource created successfully",
			202: "The request has been accepted",
			203: "Non-Authoritative Information",
			204: "There is no content in",
			205: "Reset Content",
			206: "Partial Content",
			// Redirection messages
			300: "Multiple Choice",
			301: "Moved Permanently",
			302: "Found",
			303: "See other",
			304: "Not Modified",
			306: "Unused",
			307: "Temporally Redirect",
			308: "Permanent Redirect",
			// Client error responses
			400: "Wrong parameters in the request",
			401: "The user must be logged in or sign up to",
			403: "The user is not allowed to",
			404: "The path does not exist",
			405: "The user does not have the necessary permissions for",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "There are missing fields",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Payload Too Large",
			414: "URI Too Long",
			415: "Unsupported Media Type",
			416: "Range Not Satisfiable",
			417: "Expectation Failed",
			418: "Im a teapot",
			421: "Misdirected Request",
			425: "Too Early",
			426: "Upgrade Required",
			428: "Precondition Require",
			429: "Too Many Request",
			431: "Request Header Fields Too Large",
			451: "Unavailable For Legal Reasons",
			// serve error responses
			500: "Oops! Something unexpected just happened, there are overqualified monkeys working in this issue.",
			501: "Well, this is not finished yet, but we are working day and night at this:)",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			508: "Loop Detected",
			510: "Not Extended",
			511: "Network Authentication Require",
		}
		this.getResponse = this.getResponse.bind(this)
	}

	getResponse() {
		switch (this.name) {
			case "SequelizeConnectionError":
				this.status = 408
				break

			default:
				break
		}
		if (this.files) return this.files
		if (this.html) return this.html
		return {
			label: this.codeStatus[this.status],
			message: this.message || this.codeMessage[this.status],
			status: this.status,
			data: this.data,
			cause: this.cause,
			name: this.name,
		}
	}
}
