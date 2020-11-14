import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class TestService {

  async testCall() {
    const data = await axios.get(`${REST_SERVER_URL}/test`)
    return data.data
  }
}

export const testService = new TestService()
// export default function TestService() {


//   const callAPI = () => {
//     fetch('http://localhost:9000/test')
//       .then(res => res.text())
//       .then(res => setApiResponse(res))
//   }
// }

