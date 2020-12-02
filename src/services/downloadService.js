import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/action'

class DownloadService {

  async averageDownload(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/averageDownload/${userID}`)
    return json.data
  }

  async searchDownloadsOf(userID, filtros) {
    const json = await axios.put(`${REST_SERVER_URL}/searchDownloadsOf/${userID}`, filtros)
    return json.data.map(download => Download.fromJSON(download))
  }

  // async allDownloads(userID) {
  //   const json = await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`)
  //   // console.log(json.data)
  //   return json.data.map(download => Download.fromJSON(download))
  // }

  // async downloadsByAscName(userID) {
  //   const json = await axios.get(`${REST_SERVER_URL}/downloadsByAscName/${userID}`)
  //   // console.log(json.data)
  //   return json.data.map(download => Download.fromJSON(download))
  // }

  // async downloadsByDesName(userID) {
  //   const json = await axios.get(`${REST_SERVER_URL}/downloadsByDesName/${userID}`)
  //   // console.log(json.data)
  //   return json.data.map(download => Download.fromJSON(download))
  // }
}

export const downloadService = new DownloadService()