import axios from 'axios'
import config from '../../config'
import { stringify } from 'qs'

const fetchCookie = async (data) => {
    const url = `${config.BASE_URL}${config.LOGIN_PATH}`
    try {
        const response = await axios.post(url, stringify(data))
        return response.headers['set-cookie']

    } catch (error) {
        throw error
    }
}

export default fetchCookie