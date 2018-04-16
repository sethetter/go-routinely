import * as express from 'express'
import * as passport from 'passport'

const router = express.Router()

router.get('/login', passport.authenticate('auth0', {}), (_req, res) => {
  res.redirect('/')
})

router.get('/callback', passport.authenticate('auth0', {}), (req, res) => {
  if (!req.user) throw new Error('No user!')

  res.cookie('_routinely_session', req.user.extraParams.id_token, {
    // TODO: confirm options for best security
    maxAge: req.user.extraParams.expiresIn
  })

  res.redirect('/')
})

export default router