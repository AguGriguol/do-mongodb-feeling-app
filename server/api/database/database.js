const mongoose = require('mongoose');

class Connection {
  constructor() {
    mongoose.connect(process.env.MONGO_URI_CONNECTION, JSON.parse(process.env.MONGO_PARAMS_CONNECTION));
    mongoose.set('debug', process.env.NODE_ENV !== 'production');
    ['disconnected', 'close', 'error'].forEach(function (name) {
      mongoose.connection.on(name, err => {
        console.log(`Error in database connection - ${err}`);
        let exit = process.exit;
        exit(1);
      });
    });
  }
}

module.exports = new Connection();
