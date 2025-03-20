// middleware log function

// File: src/middlewares/log/index.js
module.exports = function logTimeRequest(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next(); 
  };
