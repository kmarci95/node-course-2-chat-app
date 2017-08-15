var moment = require('moment');
var date = moment();

date.add(1, 'year').add(1,'month').subtract(1,'year').subtract(1,'month');

console.log(date.format('MMMM Do, YYYY'));


var stp = moment().valueOf();
console.log(stp);

var time = moment();
console.log(date.format('h:mm a'));



