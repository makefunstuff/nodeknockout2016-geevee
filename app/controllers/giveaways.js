const { respond, getFakeGiveaways } = require('../utils');
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Giveaway = mongoose.model('Giveaway');

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

exports.create = async(function* (req, res) {
  try {
    const giveaway = new Giveaway(req.body);
    giveaway.ownerId = req.user.id;
    yield giveaway.save();
  } catch(e) {
    return respond(res, 'giveaways/new', {
      errors: [e.message]
    });
  }

  return res.redirect('/');
});

exports.edit = function (req, res) {

};

exports.update = function (req, res){

};