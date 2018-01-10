const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('connection error: ' + err);
});

db.on('open', () => {
  console.log('connection success!');
});