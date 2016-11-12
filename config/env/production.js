'use strict';

/**
 * Expose
 */

module.exports = {
  db: 'mongodb://nko2016:trololo12@ds147497.mlab.com:47497/nko2016',
  facebook: {
    clientID: '1260365850686845',
    clientSecret: 'a3da69bab9feb996da625daf12a803bd',
    callbackURL: 'http://geevee.2016.nodeknockout.com/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://geevee.2016.nodeknockout.com/auth/twitter/callback'
  }
};
