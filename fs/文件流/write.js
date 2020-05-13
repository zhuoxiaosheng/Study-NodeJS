const fs = require('fs');

// 创建写入流

let ws = fs.createWriteStream('./test.txt', { flags: 'a', encoding: 'utf-8' })
console.log(ws)

// 监听打开事件

ws.on('open', function() {
    console.log('文件打开');

})
ws.on('close', function() {
    console.log('文件写入完成，关闭');
})
ws.write('文件流输入！', function(err) {
    if (err) return true
    console.log('写入成功');

})
ws.end(function() {
    console.log('文件流操作结束');

})

//