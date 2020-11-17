import axios from 'axios'
import { User } from '../domain/user'
import { REST_SERVER_URL } from './constants'
class UserService {

  user = new User()

  async login(username, password) {

    const json = await axios.put(`${REST_SERVER_URL}/login`, {
      username,
      password,
    })
    // this.user = User.fromJSON(json.data)
    return User.fromJSON(json.data)

  }

  async newUser(user) {
    try {
      await axios.post(
        `${REST_SERVER_URL}/newUser`,
        user,
        { headers: { 'Content-Type': 'text/plain' } }
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
        { headers: { 'Content-Type': 'text/plain' } }
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
        { headers: { 'Content-Type': 'text/plain' } }
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const userService = new UserService()
