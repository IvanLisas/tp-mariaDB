import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { Test } from '../domain/testClass'
class TestService {
  async testCall() {
    const testJSON = await axios.get(`${REST_SERVER_URL}/test`)
    // return Test.fromJSON(testJSON.data)
    console.log(testJSON.data)
    return testJSON.data
  }
}

export const testService = new TestService()  