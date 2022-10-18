const errorHandler = (error, req, res, next) => {
  res.status(500).json({ mssg: error.message });
};

module.exports = errorHandler;
