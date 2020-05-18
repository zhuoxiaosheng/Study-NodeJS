const os = require('os');

// 查看cpu
console.log(os.cpus())

// 查看内存大小
console.log(os.totalmem())

// 查看系统
console.log('当前系统' + os.arch())

// 查看剩余内存量
console.log(os.freemem())

// 查看系统平台
console.log(os.platform());