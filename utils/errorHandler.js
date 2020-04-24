module.exports = (error, response) => {
  console.error(error);
  return response
    .status(500)
    .json({ errors: [{ msg: 'Server threw an exception' }] });
};
