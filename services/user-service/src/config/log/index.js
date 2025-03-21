const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label, number) {
      return { level: label };
    },
    logSuccess(message) {
      if (process.env.LOG_LEVEL === 'success') {
        return { success: message };
      }
    },
  },
});

module.exports = logger;
