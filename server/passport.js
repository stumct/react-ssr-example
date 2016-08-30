import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User'
import mongoose from 'mongoose';

export default (passport) => {

    /**
     * Callback to Serialize the users serssion. This is where the session object is defined.
     * 
     * @callback serializeUser
     * @param {Object} user - the user object.
     * @param {function} done - passportjs done callback.
     */
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    /**
     * Callback to deserialize the user. This is where the user data is obtained from databases or other storage.
     * 
     * @callback deserializeUser
     * @param {Number} user - the user object.
     * @param {function} done - passportjs done callback.
     */
    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /**
     * Callback to Handle user registration
     * 
     * @callback localRegister
     * @param {Object} req - the request object.
     * @param {String} nickname - the users supplied nickname.
     * @param {String} password - the users supplied password.
     * @param {function} done - passportjs done callback.
     */
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            let exists;
            let err;
            process.nextTick(() => {
                console.log('localRegister')
                // asynchronous
                // User.findOne wont fire unless data is sent back

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email': email }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, { error: { code: -1, message: 'That email is already taken.', details: null }, data: null });
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    /**
   * Callback to Handle user login
   * 
   * @callback localLogin
   * @param {Object} req - the request object.
   * @param {String} nickname - the users supplied nickname.
   * @param {String} password - the users supplied password.
   * @param {function} done - passportjs done callback.
   */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(() => {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email': email }, function (err, user) {
                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, { error: { code: -1, message: 'No user found.', details: null }, data: null }); // req.flash is the way to set flashdata using connect-flash

                    // if the user is found but the password is wrong
                    if (!user.validPassword(password))
                        return done(null, false, { error: { code: -1, message: 'Incorrect password.', details: null }, data: null }); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, user);
                });


            });
        }));
};