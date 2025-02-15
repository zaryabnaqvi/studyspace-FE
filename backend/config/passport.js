const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User.js")
const dotenv = require("dotenv")
dotenv.config({ path: './config/.env' })

//?GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
    ? "http://localhost:8080/api/auth/google/callback"
    : "http://localhost:8080/api/auth/google/callback"

},
    async function (accessToken, refreshToken, profile, cb) {
        console.log("Access Token:", accessToken)
        console.log("Refresh Token:", refreshToken)
        console.log("Profile:", profile)

        //? New user obj
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName || '',  // Making it optional
            avatar: profile.photos[0].value
        }

        try {
            //? Check if user exists
            let user = await User.findOne({ googleId: profile.id })

            if (!user) {
                //? Create new user if doesn't exist
                user = await User.create(newUser)
            }

            return cb(null, user)
            
        } catch (err) {
            return cb(err)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

module.exports = passport