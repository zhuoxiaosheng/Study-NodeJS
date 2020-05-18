const fs = require('fs');

let rs = fs.createReadStream('../info.json', { flags: 'r', encoding: 'utf-8' })

let ws = fs.createWriteStream('./copy.json', { flags: 'a', encoding: 'utf-8' })

rs.on('open', function() {
    console.log('读取文件已打开');

})

rs.on('close', function() {
    console.log('文件读取完毕')
    ws.end(function() {
        console.log('文件流操作结束');
    })
})
rs.on('data', function(chunk) {
    console.log('读取单批数据流，单位：' + chunk.length);
    console.log(chunk)
    ws.write(chunk,() => {
        console.log("单批数据流入完成");
    })
})

