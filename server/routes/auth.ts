import * as express from 'express'
import * as passport from 'passport'
import * as Auth0Strategy from 'passport-auth0'

const router = express.Router()

passport.use(new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: '/auth/callback'
// @ts-ignore
}, (_accessToken, _refreshToken, _extraParams, profile, done) => {
  return done(undefined, profile)
}))

passport.serializeUser((user, done) => done(undefined, user))
passport.deserializeUser((user, done) => done(undefined, user))

// Start the auth flow, send user over to Auth0
router.get('/login', passport.authenticate('auth0', {}), (_req, res) => {
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout()
  return res.redirect('/')
})

// Receives a successful login session from Auth0, sets the access token in the session
router.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/'
}), (req, res) => {
  if (!req.user) {
    throw new Error('No user found!')
  }
  return res.redirect('/')
})

export default router
