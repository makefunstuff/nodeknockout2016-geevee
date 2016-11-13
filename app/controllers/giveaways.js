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

exports.index = async(function* (req, res) {
  const giveaways = yield Giveaway.find({});
  const { user } = req;

  respond(res, 'giveaways/index', {
    title: 'Giveways',
    giveaways,
    user
  });
});

exports.new = function (req, res) {
  res.render('giveaways/new', {
    title: 'Create new giveaway'
  });
};

exports.create = async(function* (req, res) {
  try {
    const giveaway = new Giveaway(req.body.giveaway);
    giveaway.ownerId = req.user.id;
    yield giveaway.save();
  } catch(e) {
    return respond(res, 'giveaways/new', {
      errors: [e.message]
    });
  }

  return res.redirect('/');
});

exports.show = async(function* (req, res) {
  const giveaway = yield Giveaway.findById(req.params.id);

  respond(res, 'giveaways/show', {
    giveaway
  });
});

exports.edit = function (req, res) {

};

exports.update = function (req, res){

};