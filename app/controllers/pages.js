const { respond } = require('../utils');

exports.landing = function(req, res) {
    res.render('pages/landing', {
        title: 'Giveaway service',
    });
};