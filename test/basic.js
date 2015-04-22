/* jshint camelcase: false */

var Protocol = require('bittorrent-protocol')
var ut_gitswarm = require('../')
var test = require('tape')

test('wire.use(ut_gitswarm())', function (t) {
  var wire = new Protocol()
  wire.pipe(wire)

  wire.use(ut_gitswarm())

  t.ok(wire.ut_gitswarm)
  t.end()
})

// TODO: more thorough unit tests

