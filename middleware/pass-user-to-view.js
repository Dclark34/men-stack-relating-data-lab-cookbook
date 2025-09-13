// Middle ware. assings req.session.user to res.locals.user. If no user found, set to nulll. Request sent to next();

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next();
};

module.exports = passUserToView;