
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Reproduction } from '../domain/action'

class ReproductionService {

  async reproductionsOfMonth(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/reproductionsByDate/${userID}/${month}/${year}`
    )
    return json.data
  }

  async reproductionsLast12Months(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/reproductionsLast12Months/${userID}`
    )
    return json.data
  }

  async reproductionsAverage(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/reproductionAverage/${userID}`
    )
    return json.data
  }

  async searchReproductionsOf(userID, filtros) {
    const json = await axios.put(`${REST_SERVER_URL}/searchReproductionsOf/${userID}`, filtros)
    return json.data.map(reproducion => Reproduction.fromJSON(reproducion))
  }

}

export const reproductionService = new ReproductionService()