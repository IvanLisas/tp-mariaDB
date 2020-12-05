import axios from "axios"
import { REST_SERVER_URL } from "./constants"
import { Download } from "../domain/action"

class DownloadService {

  async downloadsOfMonth(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/downloadsByDate/${userID}/${month}/${year}`
    )
    return json.data
  }

  async downloadsLast12Months(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/downloadsLast12Months/${userID}`
    )
    return json.data
  }

  async downloadsAverage(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/downloadsAverage/${userID}`
    )
    return json.data
  }

  async downloadSpeedAvg(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/downloadSpeedAvg/${userID}`
    )
    return json.data
  }

  async searchDownloadsOf(userID, filtros, orden) {
    console.log(filtros, orden)
    const json = await axios.put(
      `${REST_SERVER_URL}/searchDownloadsOf/${userID}`,
      { filtros: filtros, orden: orden }
    )
    return json.data.map((download) => Download.fromJSON(download))
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
