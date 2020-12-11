import axios from 'axios'

type CustomResponse = {
    status: number,
    message: string,
    data?: string
}
const uploadFile = async (data: FormData) => {
    try {
        const response: CustomResponse = await axios.post('/file',
            data
        )
        return response
    } catch (error) {
        throw error
    }
}

export default uploadFile 