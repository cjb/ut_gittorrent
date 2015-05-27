/* jshint camelcase: false */

var bencode = require('bencode')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var fs = require('fs');

module.exports = function () {

  inherits(ut_gittorrent, EventEmitter)

  function ut_gittorrent (wire) {
    var self = this
    EventEmitter.call(self)

    self._wire = wire
  }

  ut_gittorrent.prototype.name = 'ut_gittorrent'

  ut_gittorrent.prototype.onExtendedHandshake = function (handshake) {
    var self = this
    if (!handshake.m || !handshake.m.ut_gittorrent) {
      return self.emit('warning', new Error('Peer does not support ut_gittorrent'))
    }
    if (!self.handshook) {
      self.emit('handshake')
      self.handshook = true
    }
  }

  ut_gittorrent.prototype.ask = function(sha1) {
    var self = this
    var message = {sha: sha1}
    self._sendMessage(message)
  }

  ut_gittorrent.prototype.sendTorrent = function (infoHash) {
    var self = this
    var message = {infoHash: infoHash}
    self._sendMessage(message)
  }

  ut_gittorrent.prototype.onMessage = function (buf) {
    var self = this
    var message

    var dict = bencode.decode(buf.toString())

    if (dict.gittorrent.sha) {
      var sha = dict.gittorrent.sha.toString()
      self.emit('generatePack', sha)
      return
    }

    if (dict.gittorrent.infoHash) {
      self.emit('receivedTorrent', dict.gittorrent.infoHash.toString())
      return
    }
  }

  ut_gittorrent.prototype._sendMessage = function (message) {
    var self = this
    self._wire.extended('ut_gittorrent', {
      'gittorrent': message
    })
  }

  return ut_gittorrent
}
