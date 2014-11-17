var should   = require('chai').should(),
    mongoose = require('mongoose'),
    users    = require('../models/user'),
    User     = mongoose.model('User'),
    fs       = require('fs'),
    exec     = require('child_process').spawn,
    child;


describe('User', function() {

  after( function (done) {
    mongoose.connect('mongodb://localhost/test');
    mongoose.connection.collections['users'].drop( function(err) {
      mongoose.disconnect();
      done();
    });
  })
  
  it( 'reads stdin correctly', function(done) {
    var result ="";
    child = exec('node', ["./index.js", "enter"], { stdio: [null,null,null] }, function(err, stdout, stderr) {
      if( err ) { console.log("ERROR", err); }
    });
    child.stdin.write("add kt 778 100 add bv 778 100 add mom 778 50 add bob 777 100");
    child.stdin.write(" charge kt 100 charge bv 200 charge bob 10");
    child.stdin.write(" credit kt 100 credit bv 100 credit bob 100000\n");
    setTimeout(function() {
      child.stdin.end();
    },10000);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {
      result += data;
    });
    child.stdout.on('end', function() {
     var output = result.split('\n');
     if( output[output.length-1] === '' ) output.pop();

     var line_1 = output[0].split(' ');
     var line_2 = output[1].split(' ');
     var line_3 = output[2].split(' ');
     var line_4 = output[3].split(' ');

     line_1[0].should.be.equal('bob');
     line_2[0].should.be.equal('bv');
     line_3[0].should.be.equal('kt');
     line_4[0].should.be.equal('mom');

     line_1[2].should.be.equal('error');
     line_2[2].should.be.equal('$-100');
     line_3[2].should.be.equal('$0');
     line_4[2].should.be.equal('$0');

     done();
    });
  })

})