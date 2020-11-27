import { File } from './file'
export class Reproduction {
  constructor(accion, file, os) {
    this.accion = accion
    this.file = file
    this.os = os
  }

  static fromJSON(reproductionJSON) {
    return Object.assign(new Reproduction(), reproductionJSON, {
      accion: Accion.fromJSON(reproductionJSON.accion),
      file: File.fromJSON(reproductionJSON.file)
    })

  }

}