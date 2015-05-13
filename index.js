/* jshint camelcase: false */

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
    var self = this
    if (!handshake.m || !handshake.m.ut_pex) {
      return self.emit('warning', new Error('Peer does not support ut_pex'))
    }
  }

  ut_gitswarm.prototype.ask = function(sha1) {
    var self = this
    console.log("asking for " + sha1)
    message = sha1
    self._sendMessage(message)
  }

  ut_gitswarm.prototype.onMessage = function (buf) {
    var self = this
    var message

    console.log("in onMessage")
    console.log(buf)
  }

  ut_gitswarm.prototype._sendMessage = function (message) {
    var self = this

    self._wire.extended('ut_gitswarm', {
      'foo': message
    })
  }

  return ut_gitswarm
}
