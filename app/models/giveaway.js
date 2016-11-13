const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const Schema = mongoose.Schema;

const GiveawaySchema = new Schema({
    title: String,
    image: String,
    body: String,
    deadline: { type: Date, default: Date.now() },
    finished: { type: Boolean, default: false },
    winnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    points: Number
}, { timestamps: true });

GiveawaySchema.methods = {
  humanizedDeadline() {
    return moment(this.deadline).endOf('day').fromNow();
  },

  isPending() {
    const today = moment().startOf('day');
    const current = moment(this.deadline).startOf('day');

    return String(today) === String(current);
  },

  getParticipants() {
    return _.uniq(_.map(this.participants, String));
  },

  finishGiveaway() {
    this.finished = true;
    this.winnerId = _.shuffle(this.getParticipants())[0];
  },

  participantsCount() {
    return this.getParticipants().length;
  }
};

mongoose.model('Giveaway', GiveawaySchema);
