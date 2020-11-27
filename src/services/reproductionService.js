
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/download'

class ReproductionService {
  async allReproductions(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allReproductions/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/allReproductions/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }
}

export const reproductionService = new ReproductionService()