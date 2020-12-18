import axios from 'axios'

type CustomResponse = {
    data: {
        data: string,
        status: number,
        message: string,
    }
}
const uploadFile = async (data: FormData) => {
    try {
        const response: CustomResponse = await axios.post('/file',
            data
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export default uploadFile 