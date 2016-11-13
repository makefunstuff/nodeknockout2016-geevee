const { respond, respondOrRedirect } = require('../utils');
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

  respondOrRedirect({ req, res }, '/', {}, {
    type: 'success',
    text: 'You have created your giveway'
  });
});

exports.show = async(function* (req, res) {
  const giveaway = yield Giveaway.findById(req.params.id);

  respond(res, 'giveaways/show', {
    giveaway
  });
});

exports.edit = function (req, res) {

};

exports.update = function (req, res) {

};

exports.participate = async(function* (req, res) {
  let flash = {
    type: 'success',
    text: 'Now you are participating'
  };

  try {
    const giveaway = yield Giveaway.findById(req.params.id);
    const isParticipating = giveaway.participants.indexOf(req.params.id) !== -1;

    if (isParticipating) {
      flash = {
        type: 'warning',
        text: 'You are already participating in this giveaway'
      }
    } else {
      giveaway.participants.push(req.user.id);
      yield giveaway.save();
    }
  } catch (e) {
    return respond(res, 'giveaways/index');
  }

  respondOrRedirect({ req, res }, `/giveaways/${req.params.id}`, {}, flash);
});
