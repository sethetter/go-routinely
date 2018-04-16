import * as passport from 'passport'
import * as Auth0Strategy from 'passport-auth0'

const auth0 = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN || '',
  clientID: process.env.AUTH0_CLIENT_ID || '',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, (
  _accessToken: string,
  _refreshToken: string,
  extraParams: any,
  _profile: any,
  done: (err: Error, data: any) => void
): void => {
  done(null, { extraParams })
})

passport.use(auth0)

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

export default passport