//middleware that checks if signed in, allow request to continue on normal chain. If session does not exist, redirect to landing page.

const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;
