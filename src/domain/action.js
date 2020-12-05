import moment from 'moment'
import { format } from 'date-fns'
import { File } from './file'
class Action {
  file = new File()
  constructor(action_id, file, date_init, date_end, user_id) {
    this.action_id = action_id
    this.file = file
    this.user_id = user_id
    this.date_init = date_init
    this.date_end = date_end
  }

  get fileTitle() { return this.file.title }

  // date_init_format = () => {format(this.date_init, 'dd/MM/yyyy  ')}

  //Horrible pero bue, no se cual es el error del format :(
  date_init_format = () => {
    var chunks = this.date_init.split(' ')
    var chunks2 = chunks[0].split('-')
    return chunks2[2] + '/' + chunks2[1] + '/' + chunks2[0]
  }

}
export class Download extends Action {
  constructor(accion_id, file, date_init, date_end, user_id, download_id, speed) {
    super(accion_id, file, date_init, date_end, user_id)
    this.download_id = download_id
    this.speed = speed
  }

  static fromJSON(downloadJSON) {
    return Object.assign(new Download(), downloadJSON, {
      file: File.fromJSON(downloadJSON.file)
    })
  }
}
export class Reproduction extends Action {
  constructor(accion_id, file, date_init, date_end, user_id, reproduction_id, os) {
    super(accion_id, file, date_init, date_end, user_id)
    this.reproduction_id = reproduction_id
    this.os = os
  }

  static fromJSON(reproductionJSON) {
    return Object.assign(new Reproduction(), reproductionJSON, {
      file: File.fromJSON(reproductionJSON.file)
    })
  }
}

const buildDate = (fecha) => fecha ? new Date(moment(fecha)) : null