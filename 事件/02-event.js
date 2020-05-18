const events = require('events');
let ev = new events();
const fs = require('fs');
fs.readFile('../fs/all.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);

    } else {
        ev.emit('zxsSuccess', data)
    }
})

ev.on('zxsSuccess', function() {
    console.log('1、姓名');
})
ev.on('zxsSuccess', function() {
    console.log('2、年龄');
})
ev.on('zxsSuccess', function() {
    console.log('3、身高');
})