import moment from 'moment'
import { format } from 'date-fns'
import { File } from './file'
class TipoDeAccion {
  file = new File()
  constructor(id, action, file, user_id) {
    this.id = id
    this.action = action
    this.file = file
    this.user_id = user_id
  }

  get fileTitle() {
    return this.file.title
  }
}
export class Download extends TipoDeAccion {
  constructor(id, speed, action, file, user_id) {
    super(id, action, file, user_id)
    this.speed = speed
  }

  static fromJSON(downloadJSON) {
    return Object.assign(new Download(), downloadJSON, {
      action: Action.fromJSON(downloadJSON.action),
      file: File.fromJSON(downloadJSON.file)
    })
  }

}

export class Reproduction extends TipoDeAccion {
  constructor(id, os, action, file, user_id) {
    super(id, action, file, user_id)
    this.os = os
  }

  static fromJSON(downloadJSON) {
    return Object.assign(new Reproduction(), downloadJSON, {
      action: Action.fromJSON(downloadJSON.action),
      file: File.fromJSON(downloadJSON.file)
    })
  }
}
export class Action {
  constructor(id, date_init, date_end, type) {
    this.id = id
    this.date_init = date_init
    this.date_end = date_end
    this.type = type
  }

  date_init_format = () => this.date_init ? format(this.date_init, 'DD/MM/YYYY  ') : undefined

  static fromJSON(actionJSON) {
    return Object.assign(new Action(), actionJSON, {
      date_init: buildDate(actionJSON.date_init)
    })
  }

}


const buildDate = (fecha) => fecha ? new Date(moment(fecha)) : null