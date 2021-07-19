const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

module.exports = (app, container) => {
  const enableCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token');
    if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
    }
    next();
  };
  app.use(enableCORS);
  app.use(helmet());

  const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  };

  app.use(compression({ filter: shouldCompress }));

  // parsers
  app.use(bodyParser.urlencoded({ extended: true, limit: '4mb' }));
  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(morgan('[:date[iso]] :remote-addr :method :url :status :response-time ms - :res[content-length]'));
  app.use((req, res) => {
    req.container = container;
    req.next();
  });
};
