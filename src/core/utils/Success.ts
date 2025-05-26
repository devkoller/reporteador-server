interface SuccessProps {
  name: string
  status: number
  message?: string
  data?: any
  files?: string
  html?: string
  stringMove?: string
  module?: string
  move?: string
  id_modified?: number
}

export class Success {
  name: string
  message: string
  status: number
  data: any
  files: string | null
  html: string | null
  stringMove: string | null
  module: string | null
  move: string | null
  id_modified: number

  constructor ({
    name,
    message,
    status,
    data,
    files,
    html,
    stringMove,
    module,
    move,
    id_modified
  }: SuccessProps) {
    this.name = name
    this.status = status
    this.message = message || ''
    this.data = data
    this.files = files || null
    this.html = html || null
    this.stringMove = stringMove || ''
    this.module = module || ''
    this.move = move || ''
    this.id_modified = id_modified || 0
  }
}
