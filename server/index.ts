import * as next from 'next'
import server from './server'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || dev ? 3000 : 443

const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  server(nextHandler).listen(port, (err: Error) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
