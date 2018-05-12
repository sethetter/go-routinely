import * as express from 'express'
import * as User from '../models/user'
import * as asyncHandler from 'express-async-handler'

const router = express.Router()

// Info about currently logged in user
router.get('/me', asyncHandler(async (req, res) => {
  const { email } = req.body
  const id = await User.create({ email })

  res.json({ id })
}))

export default router
