const path = require('path')

// 获取当前执行文件的目录
console.log(__dirname)

// 获取当前的执行文件
console.log(__filename)

console.log(path.extname(__filename))

console.log(path.parse(__filename))