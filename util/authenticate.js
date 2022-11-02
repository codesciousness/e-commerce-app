const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    else return res.status(401).send('Please log in to complete this action.');
};

module.exports = authenticate;