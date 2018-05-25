import * as path from 'path'
import * as dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) })

import * as next from 'next'
import server from './server'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  server(nextHandler).listen(port, (err: Error) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
