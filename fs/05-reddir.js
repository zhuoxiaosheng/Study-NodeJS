// 读取文件夹
const fs = require('fs');

fs.readdir('../fs', function(err, files) {
    if (err) {
        console.log('文件夹不存在~')
        return true;
    }
    files.forEach(async(item, index) => {
        // console.log(item)
        let content = await ReadFs('../fs/' + item)
            // console.log(content)
        await WriteFs('./all.txt', content)
    });
})

// 读取文件内容
function ReadFs(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, function(err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// 写入文件
function WriteFs(path, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, content, { flag: 'a', encoding: 'utf-8' }, function(err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}