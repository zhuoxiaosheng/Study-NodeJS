const path = require('path');
// console.log(path)
// 获取字符串连接格式
let str = 'index.html'
let info = path.extname(str)
console.log(info)

// 拼接路径
let srcs = ['/zxs', 'a', 'b']
let info2 = path.resolve(...srcs)
console.log(info2)

// 完整路径
console.log(__dirname)
let info3 = path.join(__dirname, '/zxs', 'a', 'b')
console.log(info3)