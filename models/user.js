const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    nationality: {
        type: String,
        required: true
    },
    travelStyle: {
        type: String,
        required: true,
        enum: ['Backpacker', 'Luxury', 'Budget', 'Business', 'Family']
    },
    favoriteContinent: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);