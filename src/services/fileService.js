import axios from 'axios'
import { File } from '../domain/file'
import { REST_SERVER_URL } from './constants'

class FileService {


  async searchFiles(keyword) {
    if (keyword === '') keyword = ' '
    const json = await axios.put(`${REST_SERVER_URL}/searchFiles/`, keyword, { headers: { 'Content-Type': 'text/plain' } })
    console.log(json.data.map(file => File.fromJSON(file)))
    return json.data.map(file => File.fromJSON(file))
  }

  async downloadsAverage(userID) {
    const json = await axios.get(
      `${REST_SERVER_URL}/downloadsAverage/${userID}`
    )
    return json.data
  }

}



export const fileService = new FileService()