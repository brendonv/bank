/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  card_number: Number,
  limit: Number,
  balance: {
    type: Number,
    default: 0
  }
});

mongoose.model('User', UserSchema);