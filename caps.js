'use strict';

const port = 3331;
const caps = require('socket.io')(port);
const uuid = require('uuid').v4;



const queue = {
  pickup: [],
  transit: [],
  delivered: []
};


// Global stuff
caps.on('connection', (socket) => {//namespace
  console.log(`Welcome to the main server ${socket.id}`);

  socket.on('pickup', (payload) => {
    console.log('Package is ready for pickup');
    socket.broadcast.emit('driverpickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log(`Package ID ${payload.orderId} has been picked up`);
    console.log(`Package ID ${payload.orderId} is in transit`);

    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log(`Package ID ${payload.orderId} has been delivered`);
    socket.broadcast.emit('delivered', payload);
  });

  socket.on('Items', payload => {
    //New item ID
    let itemId = uuid();
    queue.animals[id] = payload;
    socket.emit('added');
    console.log(`${itemId} has been added to the awaiting delivery queue`);
    caps.emit('itemstored', { id, payload });
    console.log(`{ Package ${payload.orderId}}is waiting to be picked up`)
  });

  socket.on('getAll', () => {
    Object.keys(queue.storeName).forEach(id => {
      socket.emit('storeInfo', { id, payload: queue.storeName[id] });
    })

    socket.on('received', message => {
      delete queue.delivered[message.id];
    })

  });

