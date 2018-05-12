import * as express from 'express'
import * as httpErrors from 'http-errors'

const router = express.Router()

router.get('/user/me', (req, res) => {
  if (!req.user) {
    throw new httpErrors.Unauthorized()
  }
  res.json(req.user)
})

export default router
