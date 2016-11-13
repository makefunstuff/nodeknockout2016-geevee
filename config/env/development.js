'use strict';

/**
 * Expose
 */

module.exports = {
  db: 'mongodb://mongo/givedev',
  facebook: {
    clientID: '1260365850686845',
    clientSecret: 'a3da69bab9feb996da625daf12a803bd',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  }
};
