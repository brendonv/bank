
var users = require('../controllers/users'),
     luhn = require('./luhn'),
        q = require('q'),
   report = require('../js/report');



var charge = function(data) {

  users.charge(data).then(function(res) {
    if(called[data[1]].length) {
      var next = called[data[1]].shift().command;
      methods[next[0]](next);
    } else {
      delete called[data[1]];
    }
    report.collect(res.name, res.balance);
    last();
  }).catch(function(err) {
  });
};

var newUser = function(data) {
  
  if( !luhn(data[2]) ) {
    users.create(data).then(function(res) {
      if(called[data[1]].length) {
        var next = called[data[1]].shift().command;
        methods[next[0]](next);
      } else {
        delete called[data[1]];
      }
      report.collect(res.name, res.balance);
      last();
    }).catch(function(err) {
      delete called[data[1]];
    });
  } else {
    //write error to report
    report.error(data[1]);
    errors[data[1]] = data[1];
  }
};

var credit = function(data) {
  
  users.credit(data).then(function(res) {
    if(called[data[1]].length) {
      var next = called[data[1]].shift().command;
      methods[next[0]](next);
    } else {
      delete called[data[1]];
    }
    report.collect(res.name, res.balance);
    last();
  }).catch(function(err) {
  });
};

var last = function() {
  count--;
  if( count === 0 && type ) {
    report.output();
  }
};

var execute = function(command) {
  
  if( !methods.hasOwnProperty(command[0]) || command.length < 3 || command.length > 4 ) {
    throw new Error("improper command (PARSE)");
  } else if ( called.hasOwnProperty(command[1]) && !errors.hasOwnProperty(command[1])) {
    called[command[1]].push({ command : command });
    count++;
  } else if ( !errors.hasOwnProperty(command[1]) ) {
    called[command[1]] = [];
    methods[command[0]](command);
    count++;
  }
};


var methods = {
    "charge": charge,
    "add": newUser,
    "credit": credit
    };

var called = {};
var errors = {};
var count = 0;
var type;


exports.parse = function(data, flag) {

  var input = data.toLowerCase().split(' '); 
  var len = input.length;
  type = flag;

  if( len > 4 ) {
    var A = [];
    for( var i=0; i<len; i++) {
      if( methods.hasOwnProperty(input[i]) ) {
        if( i !== 0 ) {
          execute(A);
        }
        A = [];
        A.push(input[i]);
      } else if ( i === len-1) {
        A.push(input[i]);
        execute(A);
      } else {
        A.push(input[i]);
      }
    }
  } else {
    execute(input);
  }

};