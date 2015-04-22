/* jshint camelcase: false */

var EventEmitter = require('events').EventEmitter

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

  ut_gitswarm.prototype.onMessage = function (buf) {
    var self = this
    var message

    console.log("in onMessage")
  }

  ut_gitswarm.prototype._sendMessage = function () {
    var self = this

    self._wire.extended('ut_gitswarm', {
      'foo': 'bar'
    })
  }

  return ut_gitswarm
}
