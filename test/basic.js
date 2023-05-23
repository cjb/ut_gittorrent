import Protocol from 'bittorrent-protocol'

import utGittorrent from '../index.js'

import test from 'tape'

test('wire.use(ut_gittorrent())', (t) => {
  const wire = new Protocol()
  wire.pipe(wire)

  wire.use(utGittorrent())

  t.ok(wire.ut_gittorrent)
  t.ok(wire.ut_gittorrent.onExtendedHandshake)
  t.ok(wire.ut_gittorrent.ask)
  t.ok(wire.ut_gittorrent.sendTorrent)
  t.ok(wire.ut_gittorrent.onMessage)
  t.ok(wire.ut_gittorrent._sendMessage)

  t.end()
})
