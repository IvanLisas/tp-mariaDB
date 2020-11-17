import axios from 'axios'
import { User } from '../domain/usuario'
import { REST_SERVER_URL } from './constants'
export class UserService {
  async login(username, password) {
    try {
      const json = await axios.post(`${REST_SERVER_URL}/login`, {
        username,
        password,
      })
      return User.fromJSON(json.data)
    } catch (err) {
      console.log(err)
    }
  }

  async newUser(user) {
    try {
      await axios.post(
        `${REST_SERVER_URL}/newUser`,
        user,
        { headers: { "Content-Type": "text/plain" } }
      )
    } catch (err) {
      console.log(err)
    }
  }

  async searchUser(string) {
    try {
      const json = await axios.get(
        `${REST_SERVER_URL}/searchUser`,
        string,
        { headers: { "Content-Type": "text/plain" } }
      )
      console.log(json.data)
      return Usuario.fromJSON2(json.data)
    } catch (err) {
      console.log(err)
    }
  }

  async updateUser(user) {
    try {
      await axios.put(
        `${REST_SERVER_URL}/updateUser/${user.id}`,
        user,
        { headers: { "Content-Type": "text/plain" } }
      )
    } catch (err) {
      console.log(err)
    }
  }
}
