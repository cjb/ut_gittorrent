import { EventEmitter } from 'events'
import bencode from 'bencode'

export default gittorrent => {
  class utGittorrent extends EventEmitter {
    constructor (wire) {
      super()
      this._wire = wire
    }

    onExtendedHandshake (handshake) {
      if (!handshake.m || !handshake.m.ut_gittorrent) {
        return this.emit('warning', new Error('Peer does not support ut_gittorrent'))
      }
      if (!this.handshook) {
        this.emit('handshake')
        this.handshook = true
      }
    }

    ask (sha1) {
      const message = { sha: sha1 }
      this._sendMessage(message)
    }

    sendTorrent (infoHash) {
      const message = { infoHash }
      this._sendMessage(message)
    }

    onMessage (buf) {
      const dict = bencode.decode(buf.toString())
      if (dict.gittorrent.sha) {
        const sha = dict.gittorrent.sha.toString()
        this.emit('generatePack', sha)
        return
      }
      if (dict.gittorrent.infoHash) {
        this.emit('receivedTorrent', dict.gittorrent.infoHash.toString())
      }
    }

    _sendMessage = function (message) {
      this._wire.extended('ut_gittorrent', { gittorrent: message })
    }
  }

  utGittorrent.prototype.name = 'ut_gittorrent'

  return utGittorrent
}
