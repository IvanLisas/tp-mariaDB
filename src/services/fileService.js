import axios from 'axios'
import { File } from '../domain/file'
import { REST_SERVER_URL } from './constants'

class FileService {


  async searchFiles(keyword) {
    if (keyword === '') keyword = ' '

    const json = await axios.put(`${REST_SERVER_URL}/searchFiles/`, keyword, { headers: { 'Content-Type': 'text/plain' } })
    return json.data.map(file => File.fromJSON(file))
  }
}

export const fileService = new FileService()