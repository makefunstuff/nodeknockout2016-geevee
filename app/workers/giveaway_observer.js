const config = require('../../config');
const mongoose = require('mongoose');
const rollbar = require("rollbar");
const moment = require('moment');
const Giveaway = mongoose.model('Giveaway');
const models = join(__dirname, 'app/models');

rollbar.init("6b0d677396924360b2ac1407822a86ef");

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

function startWorker() {
  const today = moment().startOf('day')
  Giveaway.find({
    deadline: { $lte: today.toDate() }
  }, (err, giveaways) => {
    if (err) {
      rollbar.reportMessage(err);
    }

    giveaways.map((giveaway) => giveaway.finishGiveaway());
  });
};


connect()
  .on('error', rollbar.reportMessage)
  .on('disconnected', connect)
  .once('open', startWorker);

