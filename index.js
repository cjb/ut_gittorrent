/* jshint camelcase: false */

var bencode = require('bencode')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = function () {

  inherits(ut_gitswarm, EventEmitter)

  function ut_gitswarm (wire) {
    var self = this
    EventEmitter.call(self)

    self._wire = wire
  }

  ut_gitswarm.prototype.name = 'ut_gitswarm'

  ut_gitswarm.prototype.onExtendedHandshake = function (handshake) {
    console.error('onExtendedHandshake for gitswarm')
    console.error(handshake)
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
    console.error("asking for " + sha1)
    var message = {sha: sha1}
    self._sendMessage(message)
  }

  ut_gitswarm.prototype.onMessage = function (buf) {
    var self = this
    var message

    console.error("in onMessage")
    console.error(buf.toString())

    var dict, trailer
    try {
      var str = buf.toString()
      var trailerIndex = str.indexOf('ee') + 2
      dict = bencode.decode(str.substring(0, trailerIndex))
      trailer = buf.slice(trailerIndex)
    } catch (err) {
      // drop invalid messages
      return
    }
  }

  console.error(dict)

  ut_gitswarm.prototype._sendMessage = function (message) {
    var self = this

    self._wire.extended('ut_gitswarm', {
      'foo': message
    })
  }

  return ut_gitswarm
}
