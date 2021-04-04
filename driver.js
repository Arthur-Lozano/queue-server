'use strict';


const io = require('socket.io-client');
const host = 'http://localhost:3331';
const caps = io.connect(host);


caps.on('driverpickup', pickUp);
caps.emit('getAll', payload);

// events.on('inTransit', inTransit);

function pickUp(payload) {
  console.log('Package awaiting delivery');
  setTimeout(() => {
    console.log('picking up', payload.orderId);
    queue.pickup.unshift(payload);
    caps.emit('in-transit', payload);
    queue.intransit.unshift(payload);
  }, 1500)
  setTimeout(() => {
    caps.emit('delivered', payload);
    queue.delivered.unshift(payload);
  }, 3000)
}

module.exports = pickUp;