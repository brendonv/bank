
var log = {};

exports.output = function() {

  Object.keys(log).sort().forEach(function(k, v) {
    console.log(k,log[k]);
  });
  process.exit(0);
};

exports.collect = function(user, result) {
  log[user] = ': $' + result;
};

exports.error = function(user) {
  log[user] = ": error";
}