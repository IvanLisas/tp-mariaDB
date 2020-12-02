
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Reproduction } from '../domain/action'

class ReproductionService {
  async searchReproductionsOf(userID, filtros) {
    const json = await axios.put(`${REST_SERVER_URL}/searchReproductionsOf/${userID}`, filtros)
    return json.data.map(reproducion => Reproduction.fromJSON(reproducion))
  }
}

export const reproductionService = new ReproductionService()