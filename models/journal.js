const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    destination: {
        type: String,
        required: true, 
        immutable: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Journal', JournalSchema);