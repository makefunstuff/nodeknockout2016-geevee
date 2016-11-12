'use strict';

/*
 * Module dependencies.
 */

const users = require('../app/controllers/users');
const giveaways = require('../app/controllers/giveaways');
const auth = require('./middlewares/authorization');

const fail = {
  failureRedirect: '/'
};

/**
 * Expose routes
 */

module.exports = function (app, passport) {
  const pauth = passport.authenticate.bind(passport);

  // user routes
  app.get('/logout', users.logout);

  app.post('/users/session',
    pauth('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  app.get('/auth/facebook',
    pauth('facebook', {
      scope: [ 'email', 'user_likes', 'user_posts'],
      failureRedirect: '/login'
  }), users.signin);
  app.get('/auth/facebook/callback', pauth('facebook', fail), users.authCallback);

  app.get('/users/:userId', users.show);
  app.param('userId', users.load);


  app.get('/', giveaways.index);

  // user flow
  app.get('/giveaways/new', giveaways.new);
  app.post('/giveaways', giveaways.create);
  app.get('/giveaways', giveaways.index);
  app.get('/giveaways/:id', giveaways.show);
  app.get('/giveaways/:id/edit', giveaways.edit);
  app.post('/giveaways/:id/edit', giveaways.update);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
};
