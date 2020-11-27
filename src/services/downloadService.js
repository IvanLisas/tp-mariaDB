import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Download } from '../domain/download'

class DownloadService {
  async allDownloads(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/allDownloads/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }



  async ordernar(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/descOrderByNameAsc/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/descOrderByNameAsc/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }

  async ordernar2(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/descOrderByNameDown/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/descOrderByNameDown/${userID}`))
    return json.data.map(download => Download.fromJSON(download))
  }

  async promedio(userID) {
    const json = await axios.get(`${REST_SERVER_URL}/promedio/${userID}`)
    console.log(await axios.get(`${REST_SERVER_URL}/promedio/${userID}`))
    return json.data
  }

  async busqueda(userID, busqueda) {
    const json = await axios.get(`${REST_SERVER_URL}/busqueda/${userID}/${busqueda}`)
    return json.data.map(download => Download.fromJSON(download))
  }
}

export const downloadService = new DownloadService()