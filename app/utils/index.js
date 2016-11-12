const faker = require('faker'),
  _ = require('lodash');

module.exports = {
  respond,
  respondOrRedirect,
  getFakeGiveaways
};

function respond (res, tpl, obj, status) {
  res.format({
    html: () => res.render(tpl, obj),
    json: () => {
      if (status) return res.status(status).json(obj);
      res.json(obj);
    }
  });
}

function respondOrRedirect ({ req, res }, url = '/', obj = {}, flash) {
  res.format({
    html: () => {
      if (req && flash) req.flash(flash.type, flash.text);
      res.redirect(url);
    },
    json: () => res.json(obj)
  });
}


function getFakeGiveaways()  {
  const NUM_RECORDS = 10;

  return _.times(NUM_RECORDS, _.stubTrue).map(fakeGiveaway);
};

function fakeGiveaway() {
  return {
    name: faker.name.title(),
    image: faker.image.imageUrl(300, 300, undefined, true),
    body: faker.lorem.paragraph(),
    deadline: new Date(),
    prize: faker.name.title()
  }
};