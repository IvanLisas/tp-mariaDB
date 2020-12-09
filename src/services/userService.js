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

  async newUser(user_id) { await axios.post(`${REST_SERVER_URL}/newUser`, user_id) }

  async updateUser(user_id, userData) {
    const json = await axios.put(`${REST_SERVER_URL}/updateUser/${user_id}`, userData)
    return User.fromJSON(json.data)
  }

  async updatePassword(user_id, oldPassword, newPassword) {
    const json = await axios.put(`${REST_SERVER_URL}/updatePassword/${user_id}`, {
      oldPassword,
      newPassword,
    })


  }

  async deleteUser(user_id) { await axios.put(`${REST_SERVER_URL}/deleteUser/`, user_id) }

}

export const userService = new UserService()
