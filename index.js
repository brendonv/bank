#!/usr/bin/env node

var program = require('commander');
var users = require('./models/user');
var user = require('./js/user');
var report = require('./js/report');
var mongoose    = require("mongoose");
var fs = require('fs');
var app = [];
var env = process.env.NODE_ENV || 'customers';

var db = mongoose.connect('mongodb://localhost/' + env);

program
  .version('0.0.1')

program
  .command('enter')
  .description('Enter commands from command line')
  .action(function(){
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', function(chunk) {
      var chunk = process.stdin.read();
      if (chunk !== null) {
        try{ 
          user.parse(chunk.split('\n')[0], 0);
        } catch (e) {
          console.log(e);
        }
      }
    });

    process.stdin.on('end', function() {
      report.output();
    });

  });

program
  .command('file [file]')
  .description('Enter commands from file')
  .action(function(file){
    fs.readFile('./' + file, {'encoding' : 'utf8' }, function(err, data) {
      if( err ) { 
        console.log( "Error reading file, please try again" );
        process.exit(1); 
      } else {
        try {
          data.split('\n').forEach( function(val) {
            if ( val !== "" ) { user.parse(val, 1); }
          });
        } catch (e) {
          console.log(e);
          process.exit(1);
        }
      }
    });
  });

program
  .command('*')
  .action(function(env){
    console.log('Please Enter a Valid command, type --help for more info');
    process.exit(1);
  });

program.parse(process.argv);