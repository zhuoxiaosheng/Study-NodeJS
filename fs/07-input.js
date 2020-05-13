const readline = require('readline')
const fs = require('fs')
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



function questionList(question, ) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            console.log(`答复：${answer}`)
            resolve(answer)
                // rl.close();
        })
    })
}
async function list() {
    let name = await questionList('你的姓名？')
    let age = await questionList('你的年龄？')
    let sex = await questionList('你的性别？')
    let content = `{
        "姓名": "${name}",
        "年龄": "${age}",
        "性别": "${sex}"
    }`
    Write('./info.json', content)
    rl.close()
}

function Write(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, { flag: 'w', encoding: 'utf-8' }, function() {
            resolve()
        })
    })
}
list()