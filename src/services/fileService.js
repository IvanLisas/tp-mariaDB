import axios from 'axios'
import { File } from '../domain/file'
import { REST_SERVER_URL } from './constants'

export class FileService {

  async buscar(userID, keyword) {
    try {
      const json = await axios.post(`${REST_SERVER_URL}/search/${userID}`,
        keyword, { headers: { 'Content-Type': 'text/plain' } }
      )
      return File.fromJSON(json.data)
    } catch (err) {
      console.log(err)
    }
  }

}