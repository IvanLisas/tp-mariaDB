import { Accion } from './accion'
import { File } from './file'

export class Download {

  file = new File()
  constructor(id, speed, accion, file, user) {
    this.id = id
    this.speed = speed
    this.accion = accion
    this.file = file
    this.user = user
  }
  get fileTitle() {
    return this.file.title
  }

  static fromJSON(downloadJSON) {

    return Object.assign(new Download(), downloadJSON, {
      accion: Accion.fromJSON(downloadJSON.accion),
      file: File.fromJSON(downloadJSON.file)
    })
  }
}