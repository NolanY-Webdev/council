'use strict';

var expose = require('util/exposer')(module.exports),
    _ = require('lodash'),
    pubsub = require('service/pubsub')(),
    api = require('lib/api'),
    // sound = require('ui/sound'),
    _enableNotifications;

if (!window.Notification || Notification.permission === 'denied') {
  _enableNotifications = false;
} else if (Notification.permission === 'granted') {
  _enableNotifications = true;
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission(function (permission) {
    _enableNotifications = (permission === 'granted');
  });
}

function notify(title, opts) {
  if (!_enableNotifications) return;
  // sound.play('assets/audio/notification');
  var n = new Notification(title, _.defaults(opts || {}, {
  }));
  setTimeout(n.close.bind(n), 3000);
}

pubsub.onMessage(handleNotification);

expose(listenForNotifications);
function listenForNotifications() {
  pubsub.subscribe('/all');
}

function handleNotification(payload) {
  console.log('Notification received ', payload);

  var message = payload.message;
}