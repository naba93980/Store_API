const errorHandler = (error, req, res, next) => {
  res.status(500).json({ mssg: 'something went wrong' });
};

module.exports = errorHandler;
