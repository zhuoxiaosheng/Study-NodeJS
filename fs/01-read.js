// 导入文件模版
let fs = require('fs');

// 同步
const txt = fs.readFileSync('./test.txt', { flag: 'r', encoding: 'utf-8' });
console.log(txt);
// 异步
// fs.readFile('./test.txt', { flag: 'r', encoding: 'utf-8' }, function(err, res) {
//     if (err) {
//         console.log('报错～');
//         return true;
//     }
//     console.log(res)
//     console.log('异步-后执行');

// })
// console.log('异步-我先执行');

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

ReadFs('./test.txt').then(res => {
    console.log(res)
})

async function ReadList() {
    let file = await ReadFs('./t1.txt')
    console.log(file)
    let file2 = await ReadFs(file + '.txt')
    console.log(file2)
    let file3 = await ReadFs(file2 + '.txt')
    console.log(file3)
}
ReadList()