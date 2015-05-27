/* jshint camelcase: false */

var Protocol = require('bittorrent-protocol')
var ut_gittorrent = require('../')
var test = require('tape')

test('wire.use(ut_gittorrent())', function (t) {
  var wire = new Protocol()
  wire.pipe(wire)

  wire.use(ut_gittorrent())

  t.ok(wire.ut_gittorrent)
  t.end()
})

// TODO: more thorough unit tests

