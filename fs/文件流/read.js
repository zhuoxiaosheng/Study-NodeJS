const fs = require('fs');

let rs = fs.createReadStream('../info.json', { flags: 'r', encoding: 'utf-8' })
rs.on('open', function() {
    console.log('读取文件已打开');

})

rs.on('close', function() {
    console.log('文件读取完毕')
})
rs.on('data', function(chunk) {
    console.log('读取单批数据流，单位：' + chunk.length);
    console.log(chunk)
})