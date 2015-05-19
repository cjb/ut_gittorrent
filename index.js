/* jshint camelcase: false */

var bencode = require('bencode')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var WebTorrent = require('webtorrent')
var fs = require('fs');

module.exports = function () {

  inherits(ut_gitswarm, EventEmitter)

  function ut_gitswarm (wire) {
    var self = this
    EventEmitter.call(self)

    self._wire = wire
  }

  ut_gitswarm.prototype.name = 'ut_gitswarm'

  ut_gitswarm.prototype.onExtendedHandshake = function (handshake) {
    var self = this
    if (!handshake.m || !handshake.m.ut_gitswarm) {
      return self.emit('warning', new Error('Peer does not support ut_gitswarm'))
    }
    if (!self.handshook) {
      self.emit('handshake')
      self.handshook = true
    }
  }

  ut_gitswarm.prototype.ask = function(sha1) {
    var self = this
    var message = {sha: sha1}
    self._sendMessage(message)
  }

  ut_gitswarm.prototype.sendTorrent = function (infoHash) {
    var self = this
    var message = {infoHash: infoHash}
    self._sendMessage(message)
  }

  ut_gitswarm.prototype.onMessage = function (buf) {
    var self = this
    var message

    var dict = bencode.decode(buf.toString())

    if (dict.gitswarm.sha) {
      var sha = dict.gitswarm.sha.toString()
      self.emit('generatePack', sha)
      return
    }

    if (dict.gitswarm.infoHash) {
      self.emit('receivedTorrent', dict.gitswarm.infoHash.toString())
      return
    }
  }

  ut_gitswarm.prototype._sendMessage = function (message) {
    var self = this
    self._wire.extended('ut_gitswarm', {
      'gitswarm': message
    })
  }

  return ut_gitswarm
}
