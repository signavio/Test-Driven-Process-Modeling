import axios from 'axios'

type RequestData = {
    username: string,
    password: string,
    revisionId: string,
    globalVariables: string,
    contractName: string
}
const authenticateUser = async (data: RequestData) => {
    try {
        const response = await axios('/submit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(data)
        })

        return response.data
    } catch (error) {
        throw error
    }
}

export default authenticateUser