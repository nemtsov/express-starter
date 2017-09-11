const isPgError = (err) => ('code' in err) && ('schema' in err) && ('table' in err);
const isPgDataExceptionRe = /^22/;

module.exports = function errorHandler(err, req, res, next) {
  if (isPgError(err) && isPgDataExceptionRe.test(err.code)) {
    res.status(400).json(err.message);
  }
  else {
    next(err);
  }
};
