import * as express from 'express'

const router = express.Router()

router.get('/login', (req, res) => {
  // TODO: this
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout()

  res.clearCookie('_routinely_token', { path: '' })
  res.clearCookie('_routinely_user', { path: '' })

  res.redirect('/')
})

// router.get('/callback', passport.authenticate('auth0', {
//   failureRedirect: '/login'
// }), (req, res) => {
//   if (!req.user) throw new Error('No user!')

//   // TODO: confirm options for best security
//   res.cookie('_routinely_token', req.user.extraParams.id_token, {
//     path: '',
//     maxAge: req.user.extraParams.expires_in
//   })

//   res.cookie('_routinely_user', req.user.profile.id, {
//     path: '',
//     maxAge: req.user.extraParams.expires_in
//   })

//   res.redirect('/')
// })

export default router
