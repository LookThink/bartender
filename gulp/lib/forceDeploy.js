var through2 = require('through2'),
    jsforce  = require('jsforce');

var forceDeploy = function(username, password, token) {
  return through2.obj(function(file, enc, callback) {
    var conn = new jsforce.Connection();

    password = password + token;
    console.log(password)

    return conn.login(username, password).then(function() {
      return conn.metadata.deploy(file.contents).complete({
        details: true
      });
    })
    .then(function(res) {
      var ref, ref1;
        
      if ((ref = res.details) !== null ? ref.componentFailures : void 0) {
        console.error((ref1 = res.details) !== null ? ref1.componentFailures : void 0);
        return callback(new Error('Deploy failed.'));
      }

      return callback();
    }, 
    function(err) {
      console.error(err);
      return callback(err);
    });
  });
};

module.exports = forceDeploy;