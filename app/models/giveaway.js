const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiveawaySchema = new Schema({
    name: String,
    body: String,
    deadline: { type: Date, default: Date.now },
    prize: String
});

mongoose.model('Giveaway', GiveawaySchema);
