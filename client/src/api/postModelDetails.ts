import axios from 'axios'

type RequestData = {
    globalVariables: string,
    contractName: string
}
const postModelDetails = async (data: RequestData) => {
    try {
        const response = await axios('/compile', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        return response
    } catch (error) {
        throw error

    }
}

export default postModelDetails