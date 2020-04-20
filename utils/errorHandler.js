module.exports = (error, response) => {
  console.error(error);
  return response.status(500).json({ msg: 'Server threw an exception' });
};
