import axios from 'axios'

const uploadFile = async (data: FormData) => {
    try {
        const response = await axios.post('/file',
            data
        )

        return response
    } catch (error) {
        throw error
    }
}

export default uploadFile 