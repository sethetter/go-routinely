import * as express from 'express'
import * as bodyParser from 'body-parser'

const app = express()
const router = require('express-promise-router')()

app.use(bodyParser.json())
app.use(router)

app.get('/api', async (_req, res) => {
  res.json({ message: 'sup' })
})

export default app 