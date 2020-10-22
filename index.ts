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
import path from 'path'
import Axios from 'axios'

const app = express()
const port = process.env.PORT || 4000
app.use(cookieParser())

app.set('views', join(`${path.resolve('./')}`, 'views'))
app.set('view engine', 'pug')

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(express.static(join(`${path.resolve('./')}`, 'public')))

app.get('/', (req, res) => {
  res.render('home', {
    title: '',
  })
})

app.get('/engine', (req, res) => {
  res.render('engine', {
    title: 'Please login with your Signavio credentials and Diagram ID',
  })
})

app.post('/engine', async (req, res, next) => {
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
    var cookieData

    await axios
      .post(login_url, stringify(data))
      .then(function (response) {
        cookieData = response.headers['set-cookie']
        return cookieData
        //console.log(cookieData)
      })
      .catch(function (error) {
        console.log(error)
      })

    fetchXML(cookieData)

    async function fetchXML(cookieData: any) {
      let temp1 = String(cookieData[0]).split(';')
      let jID = String(temp1[0]).split('=')
      let jsesssion_ID = jID[1]

      let temp2 = String(cookieData[1]).split(';')
      let tok = String(temp2[0]).split('=')
      let auth_token = tok[1]

      let temp3 = String(cookieData[4]).split(';')
      let rID = String(temp3[0]).split('=')
      let lb_route_ID = rID[1]

      let diagram_url =
        base_url + '/p/revision' + '/' + revision_ID + '/' + format

      let cookies = { JSESSIONID: jsesssion_ID, LBROUTEID: lb_route_ID }
      let headers = { Accept: 'application/json', 'x-signavio-id': auth_token }

      let options: AxiosRequestConfig = {
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

      xmlDiagram = await axios
        .request(options)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })

      let xmlWithGlobalVariables = addGlobalDocumentation(
        xmlDiagram,
        globalVariables,
        contractName
      )
      const successFlag = hasTestPassed(xmlWithGlobalVariables)
      if (successFlag) {
        compile(xmlWithGlobalVariables).then((contract: any) => {
          console.log(
            'Solidity Smart Contract:',
            beautify(contract.Solidity, {
              indent_size: 2,
              space_in_empty_paren: true,
            })
          )
          console.log(
            '--------------------------------------------------------------------------------------------------------------------------------------------------------'
          )
          console.log(
            'ABI:',
            beautify(contract.ABI, {
              indent_size: 2,
              space_in_empty_paren: true,
            })
          )
          res.redirect('/result')
        })
      } else {
        res.redirect('/error')
      }
    }
  }

  authenticate()
})

app.get('/result', (req, res) => {
  res.render('result', {
    title:
      'The Test has passed and diagram has been successfully compiled to smart contract',
  })
})

app.get('/error', (req, res) => {
  res.render('error', {
    title: 'The Test has failed',
  })
})

app.listen(port, () => console.log(`app listening on port ${port}`))
