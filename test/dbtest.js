const mongoose = require('mongoose');

mongoose.connect('mongodb://localhose/test');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('connection error: ' + err);
});

db.on('open', () => {
  console.log('connection success!');
});