
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Reproduction } from '../domain/action'

class ReproductionService {
  async allReproductions(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allReproductions/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/allReproductions/${userID}`))
    return json.data.map(reproduction => Reproduction.fromJSON(reproduction))
  }
}

export const reproductionService = new ReproductionService()