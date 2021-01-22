import express, { Request, Response } from 'express'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import { compile } from 'bpmn-sol'
import SignavioParser from './packages/signavio-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import path from 'path'
import fetchCookie from './server/api/fetchCookie'
import cors from 'cors'
import getCookieDetails from './server/helpers/getCookieDetails'
import fetchDiagramXml from './server/api/fetchDiagramXml'
import handleFileUpload from './server/api/handleFileUpload'

const app: express.Application = express()
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'http://127.0.0.1:8080'


app.use(express.static(`${path.resolve("./")}/client/build`))
app.use(bodyParser.json())
app.use(helmet())
app.use(cookieParser())
app.use(cors({ origin: true }))
app.use(urlencoded({ extended: false }))


app.post('/submit', async (req: Request, res: Response, next) => {
  const {
    username,
    password,
    revisionId,
    globalVariables,
    contractName,
  } = req.body

  try {
    const cookieData = await fetchCookie({ name: username, password: password, tokenonly: 'true' })
    try {

      const diagramXml = await fetchDiagramXml({ revisionId, ...getCookieDetails(cookieData) })
      const parser = new SignavioParser(diagramXml,
        globalVariables,
        contractName)
      const isSuccessfullyParsed = parser.parse()

      if (isSuccessfullyParsed) {
        const contract: any = await compile(parser.getXmlWithGlobalVariables())
        res.send({ status: 200, message: 'Success', data: contract })
      } else {
        res.send({ status: 500, message: 'Tests failed. Please check the diagram details.' })
      }
    } catch (error) {
      res.send({ status: 404, message: 'Error while fetching diagram. Please provide the correct diagram details' })
    }
  }
  catch (error) {
    res.send({ status: 401, message: 'Error authenticating. Please check your credentials.' })
  }
})

app.post('/compile', async (req: Request, res: Response, next) => {
  const {
    xmlString,
    globalVariables,
    contractName,
  } = req.body


  try {
    const parser = new SignavioParser(xmlString,
      globalVariables,
      contractName)

    const isSuccessfullyParsed = parser.parse()

    if (isSuccessfullyParsed) {
      const contract: any = await compile(parser.getXmlWithGlobalVariables())
      res.send({ status: 200, message: 'Success', data: contract })
    } else {
      res.send({ status: 500, message: 'Tests failed. Please check the diagram details.' })
    }
  } catch (error) {
    res.send({ status: 404, message: 'Error while fetching diagram. Please provide the correct diagram details' })
  }
})

interface CustomRequest extends Request {
  file: any
  rawBody: any
}
app.post('/file', async (req: CustomRequest, res) => {
  await handleFileUpload(req, res)
})


app.get('*', (req, res) => {
  res.sendFile(`${path.resolve('./')} /client/build/index.html`)
})

app.listen(PORT, () => console.log(`app listening on port ${PORT} `))
