import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/action'

class DownloadService {
  async allDownloads(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`)
    console.log(json.data)
    return json.data.map(download => Download.fromJSON(download))
  }

  async downloadsByAscName(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/downloadsByAscName/${userID}`)
    console.log(json.data)
    return json.data.map(download => Download.fromJSON(download))
  }

  async downloadsByDesName(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/downloadsByDesName/${userID}`)
    console.log(json.data)
    return json.data.map(download => Download.fromJSON(download))
  }

  async averageDownload(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/averageDownload/${userID}`)
    return json.data
  }

  async searchDownloadsOf(userID, keyword) {
    if (keyword !== '') {
      const json = await axios.put(`${REST_SERVER_URL}/searchDownloadsOf/${userID}`, keyword, { headers: { 'Content-Type': 'text/plain' } })
      return json.data.map(download => Download.fromJSON(download))
    }
    else return await this.allDownloads(userID)
  }
}

export const downloadService = new DownloadService()