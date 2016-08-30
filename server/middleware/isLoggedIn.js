/**
 * IsLoggedIn middleware to determine if the user is logged in.
 * 
 * @param {Object} req - the express request object.
 * @param {Object} res - the express response object.
 * @param {function} done - express middleware next callback.
 */
export default (req, res, next) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        next();
    } else {
        req.user = null;
        res.json({ error: { code: -1, message: 'Not Logged In!' } });
    }
};