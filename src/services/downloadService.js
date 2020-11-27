import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/action'

class DownloadService {
  async allDownloads(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }

  async downloadsByAscName(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/downloadsByAscName/${userID}`)
    return json.data.map(download => Download.fromJSON(download))
  }

  async downloadsByDesName(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/downloadsByDesName/${userID}`)
    return json.data.map(download => Download.fromJSON(download))
  }

  async averageDownload(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/averageDownload/${userID}`)
    return json.data
  }

  async searchDownloadsOf(userID, busqueda) {
    const json = await axios.get(`${REST_SERVER_URL}/searchDownloadsOf/${userID}/${busqueda}`)
    return json.data.map(download => Download.fromJSON(download))
  }
}

export const downloadService = new DownloadService()