# ut_gitswarm

### BitTorrent Extension for exchanging git objects

Node.js implementation of the ut_gitswarm protocol, as used by [GitSwarm](http://gitswarm.com)

The purpose of this extension is to allow torrent peers to speak Git's Smart Protocol to each other. 

## install

```
npm install ut_gitswarm
```

## usage

This package should be used with [bittorrent-protocol](https://github.com/feross/bittorrent-protocol), which supports a plugin-like system for extending the protocol with additional functionality.

## license

MIT. Copyright (c) Chris Ball.
