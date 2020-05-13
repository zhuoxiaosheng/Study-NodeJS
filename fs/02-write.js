const fs = require('fs');
// r 读取 w 写入 a 追加
fs.writeFile('./test.txt', '不试试怎么知道自己不ok？\n', { flag: "w", encoding: "utf-8" }, function(err) {
    if (err) {
        console.log('写入失败');

    } else {
        console.log('写入success');
    }
})

function write(path, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err) {
            if (err) {
                reject()
            } else {
                console.log('成功')
                resolve()
            }
        })
    })
}
async function writeList() {
    let path = './test.txt';
    await write(path, '你好；在坚持坚持！！！\n')
    await write(path, '学习使我快乐\n')
}
writeList()