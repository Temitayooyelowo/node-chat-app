const moment = require('moment');

// Jan 1st 1970 00:00:10 am

// let date = new Date();
// months = ['Jan', 'Feb']
// console.log(date.getMonth());

// let date = moment();
// date.add(100,'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

//Use padded version for minutes and unpadded version for hours e.g. 6:01 am
// 11:20 am

let sometTimestamp = moment().valueOf();
console.log(sometTimestamp);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('LT'));
