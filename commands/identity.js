var user       = require('../lib/user');
var logger     = require('../lib/logger');
var cliUtil    = require('../lib/cli-util');
var sfClient   = require('../lib/sf-client');
var _          = require('lodash');

function flattenAndFilter(obj, fields, pre) {
  _.forIn(obj, function(v, k) {
    if(pre) k = pre + '.' + k;
    if(_.isObject(v)) {
      flattenAndFilter(v, fields, k);
    } else if(!fields || !fields.length || fields.indexOf(k) !== -1) {
      logger.list(k + ': ' + v);
    }
  });
}

var run = module.exports.run = function(opts, cb) {
  var oauth = opts.oauth;

  sfClient.getClient(opts.oauth).then(function(client) {
    return client.getIdentity( { oauth: opts.oauth });
  }).then(function(res) {
    flattenAndFilter(res, opts.fields);
    cb(null);
  }).catch(function(err) {
    cb(err);
  });
};

module.exports.cli = function(program) {
  program.command('identity')
    .description('show the identity for the specified org')
    .option('-o, --org <org>', 'The Salesforce organization to use')
    .option('-f, --fields <fields>', 'Comma-separated fields to show. Use dot notation')
    .action(function(opts) {
      opts._loadOrg = true;
      return cliUtil.executeRun(run)(opts);
    });
};
