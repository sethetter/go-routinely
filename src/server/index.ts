import * as path from 'path'
import * as dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) })

import server from './server'

const port = process.env.PORT || 3000

server().listen(port, (err: Error) => {
  if (err) throw err
  console.log(`> Ready on localhost:${port}`)
})
