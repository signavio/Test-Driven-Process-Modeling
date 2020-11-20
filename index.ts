import express from 'express'
import { join } from 'path'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import axios, { AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { addGlobalDocumentation } from './server/addGlobalDocumentation'
import { compile } from 'bpmn-sol'
import { hasTestPassed } from './server/testModule'
import beautify from 'js-beautify'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import path from 'path'
import Axios from 'axios'
import fetchCookie from './server/api/fetchCookie'
import config from './config'
import cors from 'cors'
import getCookieDetails from './server/helpers/getCookieDetails'
import fetchDiagramXml from './server/api/fetchDiagramXml'

const app: express.Application = express()
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'http://127.0.0.1:8080'


app.use(express.static(`${path.resolve("./")}/client/build`))
app.use(bodyParser.json())
app.use(helmet())
app.use(cookieParser())
app.use(cors({ origin: true }))
app.use(urlencoded({ extended: false }))
// app.use(json())

app.post('/submit', async (req, res, next) => {
  const {
    username,
    password,
    revisionId,
    globalVariables,
    contractName,
  } = req.body

  try {
    const cookieData = await fetchCookie({ name: username, password: password, tokenonly: 'true' })
    const diagramXml = await fetchDiagramXml({ revisionId, ...getCookieDetails(cookieData) })
    let xmlWithGlobalVariables = addGlobalDocumentation(
      diagramXml,
      globalVariables,
      contractName
    )
    const successFlag = hasTestPassed(xmlWithGlobalVariables)
    if (successFlag) {
      const contract: any = await compile(xmlWithGlobalVariables)
      console.log(
        'Solidity Smart Contract:',
        beautify(contract.Solidity, {
          indent_size: 2,
          space_in_empty_paren: true,
        })
      )
      console.log(
        'ABI:',
        beautify(contract.ABI, {
          indent_size: 2,
          space_in_empty_paren: true,
        }))

      res.send({ status: 200, message: 'Success', data: contract })
    } else {
      res.send({ status: 500, message: 'Tests failed' })
    }
  }
  catch (error) {
    res.send(error)
  }
})

app.get('*', (req, res) => {
  res.sendFile(`${path.resolve('./')} /client/build/index.html`)
})

app.listen(PORT, () => console.log(`app listening on port ${PORT} `))
