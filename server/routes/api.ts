import * as express from 'express'

const router = express.Router()

router.get('/', async (_req, res) => {
  res.json({ message: 'sup' })
})

export default router