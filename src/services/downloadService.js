import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/download'

class DownloadService {
  async allDownloads(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }

  async todasReproduccionesDe(userID) {

    const json = await axios.get(`${REST_SERVER_URL}/todasReproduccionesDe/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/todasReproduccionesDe/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }

  async ordernar(userID) {

    const json = await axios.get(`${REST_SERVER_URL}/repOrderByNameDesc/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/repOrderByNameDesc/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }
}

export const downloadService = new DownloadService()