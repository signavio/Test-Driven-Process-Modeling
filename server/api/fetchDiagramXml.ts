import axios from 'axios'
import config from '../../config'


type Params = {
    revisionId: string,
    jsesssion_ID: string,
    lb_route_ID: string,
    auth_token: string
}
const fetchDiagramXml = async ({ revisionId, jsesssion_ID, lb_route_ID, auth_token }: Params) => {
    const diagramUrl = `${config.BASE_URL}${config.REVISION_PATH}${revisionId}/${config.FORMAT}`

    try {
        const response = await axios(diagramUrl, {
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'accept-encoding': 'gzip, deflate',
                Host: 'editor.signavio.com',
                'Cache-Control': 'no-cache',
                'x-signavio-id': auth_token,
                Cookie: `JSESSIONID = ${jsesssion_ID}; LBROUTEID = ${lb_route_ID} `,
                Accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        throw (error)
    }
}


export default fetchDiagramXml