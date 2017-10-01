var helmet   = require('helmet');

module.exports = function(app) {
  app.use(helmet.contentSecurityPolicy({
    directives: {
      connectSrc: [
        "'self'",
      "ws://localhost:3000"
      ]
    }
  }));
};
