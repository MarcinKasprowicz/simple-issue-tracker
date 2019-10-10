module.exports = (req, res, next) => {
  req.user = {
    id: req.decoded.sub,
    login: req.decoded.sub,
    firstName: req.decoded.sub,
    lastName: req.decoded.sub,
  };
  return next();
};
