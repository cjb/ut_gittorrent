import Protocol from 'bittorrent-protocol'

import utGittorrent from '../index.js'

import test from 'tape'

test('wire.use(ut_gittorrent())', (t) => {
  var wire = new Protocol()
  wire.pipe(wire)

  wire.use(utGittorrent())

  t.ok(wire.ut_gittorrent)
  t.end()
})
