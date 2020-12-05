
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Reproduction } from '../domain/action'

class ReproductionService {
  async searchReproductionsOf(user_id, filtros, orden) {
    const json = await axios.put(`${REST_SERVER_URL}/searchReproductionsOf/${user_id}`, { filtros: filtros, orden: orden })
    return json.data.map(reproducion => Reproduction.fromJSON(reproducion))
  }

  async reproductionsByDate(user_id, month, year) {
    const json = await axios.get(`${REST_SERVER_URL}/reproductionsByDate/${user_id}/${month}/${year}`)
    console.log(json.data)
    return json.data
  }

  async reproductionsLast12Month(user_id) {
    const json = await axios.get(`${REST_SERVER_URL}/reproductionsLast12Months/${user_id}`)
    console.log(json.data)
    return json.data
  }

  async reproductionAverage(user_id) {
    const json = await axios.get(`${REST_SERVER_URL}/reproductionAverage/${user_id}`)
    console.log(json.data)
    return json.data
  }

}

export const reproductionService = new ReproductionService()