
var mongoose = require('mongoose'),
        User = mongoose.model('User'),
           q = require('q');

exports.create = function(user) {
  var d = q.defer();
  var limit = user[3].split('$')[1] || user[3];
  var customer = new User({ name : user[1], card_number : user[2], limit : limit });
  customer.save(function(err, doc) {
    if( err ) { 
      d.reject(err);
    } else {
      d.resolve(doc);
    }
  });
  return d.promise;
};

exports.credit = function(data) {
  var d = q.defer();
  var amount = parseInt(data[2].split('$')[1]) || parseInt(data[2]);
  User.findOne({ name : data[1] }, function(err, user) {
    if( err || user === null ) {
      d.reject(err);  
    } else {
      user.balance-=amount;
      user.save(function(err) {
        if( err ) { d.reject(err); }
        d.resolve(user);
      });
    }
  });

  return d.promise;
};

exports.charge = function(data) {
  var d = q.defer();
  var amount = parseInt(data[2].split('$')[1]) || parseInt(data[2]);
  User.findOne({ name : data[1] }, function(err, user) {
    if( err || user === null ) {
      d.reject(err);
    } else {
      if( user.balance + amount <= user.limit ) {
        user.balance+=amount;
      }
      user.save(function(err) {
        if( err ) { d.reject(err); }
        d.resolve(user);
      });
    }
  });

  return d.promise;
};
