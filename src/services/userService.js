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

  async newUser(user) { await axios.post(`${REST_SERVER_URL}/newUser`, user) }



  async updateUser(user) { await axios.put(`${REST_SERVER_URL}/updateUser/`, user) }

  async deleteUser(user) {
    console.log(user)
    await axios.put(`${REST_SERVER_URL}/deleteUser/`, user)
  }
}

export const userService = new UserService()
