const mongoose = require('mongoose');
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

mongoose.model('Giveaway', GiveawaySchema);
