import express from 'express'
import path from 'path'
import bodyparser from 'body-parser'
import request from 'request'
import StringDecoder from 'string_decoder'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import qs from 'qs'
import { addGlobalDocumentation } from './server/preProcessingModule'
import { compile } from 'bpmn-sol'
import { testModule } from './server/testModule'
import { fetchTestScript } from './server/testModule'

const app = express()
const port = process.env.PORT || 4000
app.use(cookieParser())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.resolve("./") + "/build/client"))

// app.get('/', (req: any, res: { render: (arg0: string, arg1: { title: string }) => void }) => {
//   res.render('home', {
//     title: '',
//   })
// })
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./") + "/build/frontend/index.html")
})

app.get('/engine', (req: any, res: { render: (arg0: string, arg1: { title: string }) => void }) => {
  res.render('engine', {
    title: 'Please login with your Signavio credentials and Diagram ID',
  })
})

app.post('/engine', async (req: { body: { username: any; password: any; diagramID: any; globalVariables: any; contractName: any } }, res: { redirect: (arg0: string) => void }, next: any) => {
  var jsonDiagram
  var xmlDiagram

  var username = req.body.username
  var password = req.body.password
  var revision_ID = req.body.diagramID //20345a550b07426e890bd45320f7b8c7
  var globalVariables = req.body.globalVariables
  var contractName = req.body.contractName

  const base_url = 'https://editor.signavio.com'
  const login_url = base_url + '/p/login'
  var workspace_ID = '95cfa9c10e37451f827f6f3421f2e56d'
  var format = 'bpmn2_0_xml'
  let data = { name: username, password: password, tokenonly: 'true' }

  //Main authentication of the Signavio credentials
  const authenticate = async () => {
    var cookieData: any

    await axios
      .post(login_url, qs.stringify(data))
      .then(function (response: { headers: { [x: string]: any } }) {
        cookieData = response.headers['set-cookie']
        return cookieData
        //console.log(cookieData)
      })
      .catch(function (error: any) {
        console.log(error)
      })

    fetchXML(cookieData)

    async function fetchXML(cookieData: any[] | undefined) {
      let temp1 = String(cookieData![0]).split(';')
      let jID = String(temp1[0]).split('=')
      let jsesssion_ID = jID[1]

      let temp2 = String(cookieData![1]).split(';')
      let tok = String(temp2[0]).split('=')
      let auth_token = tok[1]

      let temp3 = String(cookieData![4]).split(';')
      let rID = String(temp3[0]).split('=')
      let lb_route_ID = rID[1]

      let diagram_url =
        base_url + '/p/revision' + '/' + revision_ID + '/' + format

      let cookies = { JSESSIONID: jsesssion_ID, LBROUTEID: lb_route_ID }
      let headers = { Accept: 'application/json', 'x-signavio-id': auth_token }

      let options: any = {
        method: 'GET',
        url: diagram_url,
        headers: {
          'cache-control': 'no-cache',
          Connection: 'keep-alive',
          'accept-encoding': 'gzip, deflate',
          Host: 'editor.signavio.com',
          'Cache-Control': 'no-cache',
          'x-signavio-id': auth_token,
          Cookie: `JSESSIONID=${jsesssion_ID}; LBROUTEID=${lb_route_ID}`,
          Accept: 'application/json',
        },
      }

      xmlDiagram = await axios(options)
        .then(function (response: { data: any }) {
          return response.data
        })
        .catch(function (error: any) {
          console.log(error)
        })

      let xmlWithGlobalVariables = addGlobalDocumentation(
        xmlDiagram,
        globalVariables,
        contractName
      )

      let successFlag = testModule(xmlDiagram)

      if (successFlag) {
        const contract =
          compile(xmlWithGlobalVariables)
            .then((contract: any) => {
              console.log(contract)
              res.redirect('/result')
            })
      } else {
        res.redirect('/error')
      }
    }
  }

  authenticate()
})

app.get('/result', (req: any, res: { render: (arg0: string, arg1: { title: string }) => void }) => {
  res.render('result', {
    title:
      'The Test has passed and diagram has been successfully compiled to smart contract',
  })
})

app.get('/error', (req: any, res: { render: (arg0: string, arg1: { title: string }) => void }) => {
  res.render('error', {
    title: 'The Test has failed',
  })
})

app.listen(port, () => console.log(`app listening on port ${port}`))
