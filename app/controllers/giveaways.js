const { respond, getFakeGiveaways } = require('../utils');

exports.show = function (req, res) {
  const user = req.profile;

  respond(res, 'giveaways/show', {
    title: 'Giveway name',
    user
  });
};

exports.index = function (req, res) {
  const giveaways = getFakeGiveaways();
  const { user } = req;

  respond(res, 'giveaways/index', {
    title: 'Giveways',
    giveaways,
    user
  });
};

exports.new = function (req, res) {
  res.render('giveaways/new', {
    title: 'Create new giveaway'
  });
};

exports.create = function (req, res) {

};