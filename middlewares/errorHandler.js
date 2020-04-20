module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err.message);
    return res.status(400).json({ msg: 'Invalid json' }); // Bad request
  }
  next();
};
