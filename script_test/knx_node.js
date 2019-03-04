var knx = require('knx');
var connection = knx.Connection({
 handlers: {
  connected: function() {
    console.log('Connected!');
  },
  event: function (evt, src, dest, value) {
  console.log("%s **** KNX EVENT: %j, src: %j, dest: %j, value: %j",
    new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    evt, src, dest, value);
  }
 }
});