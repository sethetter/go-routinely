import * as passport from 'passport'
import * as Auth0Strategy from 'passport-auth0'

const auth0 = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN || '',
  clientID: process.env.AUTH0_CLIENT_ID || '',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, (_accessToken, _refreshToken, _extraParams, profile, done) => {
  return done(null, profile)
})

passport.use(auth0)

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

export default passport