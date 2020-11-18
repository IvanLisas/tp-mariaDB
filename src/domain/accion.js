import moment from 'moment'
import { format } from 'date-fns'

export class Accion {
  constructor(id, date_init, date_end, type) {
    this.id = id
    this.date_init = date_init
    this.date_end = date_end
    this.type = type
  }

  date_init_format = () => this.date_init ? format(this.date_init, 'DD/MM/YYYY  ') : undefined

  static fromJSON(accionJSON) {
    return Object.assign(new Accion(), accionJSON, {
      date_init: buildDate(accionJSON.date_init)
    })
  }

}

const buildDate = (fecha) => fecha ? new Date(moment(fecha)) : null