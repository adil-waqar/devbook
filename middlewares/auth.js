const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from header
  const token = req.header('x-auth-token');
  // Check if token exists
  if (!token) return res.status(401).json({ msg: 'Token not supplied' });
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ errors: [{ msg: error.message }] });
  }
};
