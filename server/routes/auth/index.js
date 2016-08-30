import isLoggedIn from '../../middleware/isLoggedIn';

export default (app, router, passport) => {

    /**
     * Callback to to handle the /register route.
     * 
     * @callback register
     * @param {Object} req - the express request object.
     * @param {Object} res - the express response object.
     * @param {function} next - express next callback.
     */
    router.post('/register', (req, res, next) => {
        passport.authenticate('local-register', (err, user, info) => {
            console.log('/register', err, user, info)
            if (err) { return next(err); }
            else if (!user && !info) { res.sendStatus(500); }
            else if (!user) { return res.json(info); } else {
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    return res.json({ error: null, data: user });
                });
            }
        })(req, res, next);
    });

    /**
     * Callback to to handle the /login route.
     * 
     * @callback login
     * @param {Object} req - the express request object.
     * @param {Object} res - the express response object.
     * @param {function} next - express next callback.
     */
    router.post('/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            if (err) { return next(err); }
            else if (!user) { return res.json(info); } else {
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    return res.json({ error: null, data: user });/////
                });
            }
        })(req, res, next);
    });

    router.get('/', isLoggedIn, (req, res) => {
        res.send(req.user);
    });

    /**
     * Callback to to handle the /logout route.
     * 
     * @callback logout
     * @param {Object} req - the express request object.
     * @param {Object} res - the express response object.
     */
    router.get('/logout', (req, res) => {
        req.session = null;
        res.clearCookie('connect.sid');
        res.clearCookie();
        req.logOut();
        res.redirect('/');
    });

    // Attach the routes
    app.use('/auth', router);
};