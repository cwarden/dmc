var user     = require('../lib/user');
var logger   = require('../lib/logger');
var cliUtil  = require('../lib/cli-util');
var sfClient = require('../lib/sf-client');

var run = module.exports.run = function(org, file, opts, cb) {
  cb(new Error('not implemented'));
};

module.exports.cli = function(program) {
  program.command('anon <org> <file>')
    .description('execute anonymous apex <file> in a target <org>')
    .action(function(org, file, opts) {
      cliUtil.checkForOrg(org);
      run(org, file, opts, cliUtil.callback);
    });
};
