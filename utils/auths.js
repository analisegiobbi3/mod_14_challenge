const withAuth = (req, res, next) => {
    if (!res.session.loggedIn){
        res.redirect('')
    }else {
        next()
    }
}

module.exports = withAuth;