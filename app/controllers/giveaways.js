const { respond, respondOrRedirect } = require('../utils');
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const winston = require('winston');
const Giveaway = mongoose.model('Giveaway');
const User = mongoose.model('User');
const logger = require('winston');

exports.show = function (req, res) {
  const user = req.profile;

  respond(res, 'giveaways/show', {
    title: 'Giveway name',
    user
  });
};

exports.index = async(function* (req, res) {
  const giveaways = yield Giveaway.find({});
  let { user } = req;

  if (user) {
    user = yield User.findById(user.id);
  }

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

exports.delete = async(function* (req, res) {
  try {
    const giveaway = yield Giveaway.findById(req.params.id);

    if (!giveaway.finished) {
      const user = yield User.findById(req.user.id);
      user.karma -= 1;
      yield user.save();
    }

    yield giveaway.remove();
  } catch (e) {
    winston.error(e.message);
    return respondOrRedirect({ req, res }, 'giveaways/index', {}, {
      type: 'error',
      text: e.message
    });
  }

  respondOrRedirect({ req, res }, '/', {}, {
    type: 'success',
    text: 'You have deleted your giveway'
  });
});

exports.create = async(function* (req, res) {
  try {
    const giveaway = new Giveaway(req.body.giveaway);
    const user = yield User.findById(req.user.id);

    giveaway.ownerId = req.user.id;
    user.karma += 1;

    yield user.save();
    yield giveaway.save();

  } catch(e) {
    winston.error(e.message);
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
  let user = false;
  const giveaway = yield Giveaway.findById(req.params.id);

  if (req.user) {
    user = yield User.findById(req.user.id);
  }

  respond(res, 'giveaways/show', {
    giveaway,
    user
  });
});

exports.edit = async(function* (req, res) {
  const giveaway = yield Giveaway.findById(req.params.id);

  respond(res, 'giveaways/edit', {
    giveaway
  });
});

exports.update = async(function* (req, res) {
  try {
    yield Giveaway.update({_id: req.params.id }, {$set: req.body.giveaway });
  } catch(e) {
    winston.error(e.message);
    return respond(res, 'giveaways/new', {
      errors: [e.message]
    });
  }

  respondOrRedirect({ req, res }, '/', {}, {
    type: 'success',
    text: 'You have saved your giveaway'
  });
});

exports.participate = async(function* (req, res) {
  let flash = {
    type: 'success',
    text: 'Now you are participating'
  };

  try {
    const giveaway = yield Giveaway.findById(req.params.id);
    const isParticipating = giveaway.getParticipants().indexOf(String(req.params.id)) !== -1;

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
    winston.error(e.message);
    return respond(res, 'giveaways/index');
  }

  respondOrRedirect({ req, res }, `/giveaways/${req.params.id}`, {}, flash);
});
