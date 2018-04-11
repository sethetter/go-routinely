import { createServer } from 'http'
import { parse } from 'url'
import * as next from 'next'
import api from './api'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if ((/^\/?api/).test(pathname)) {
      return api(req, res)
    }

    return handle(req, res, parsedUrl)
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
