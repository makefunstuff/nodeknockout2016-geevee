const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const GiveawaySchema = new Schema({
    title: String,
    image: String,
    body: String,
    deadline: { type: Date, default: Date.now },
    finished: { type: Boolean, default: false },
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    points: Number
});

GiveawaySchema.methods = {
  humanizedDeadline() {
    return moment(this.deadline).endOf('day').fromNow();
  },

  participantsCount() {
    return this.participants.length;
  }
};

mongoose.model('Giveaway', GiveawaySchema);
