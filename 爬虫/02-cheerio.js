const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
let str = 'https://www.doutula.com/article/list/?page=1'

// 获取页面总数
async function getNum() {
    let res = await axios.get(str);
    const $ = cheerio.load(res.data)
    let len = $('.pagination .page-item').length

    let all = $('.pagination .page-item').eq(len - 2).find('.page-link').text()
    return all;
}
async function gogo() {
    let num = await getNum()
    for (let i = 0; i < num; i++) {
        await getPage(i)
    }
}

async function getPage(i) {
    let url = `https://www.doutula.com/article/list/?page=${i}`
    await axios.get(url).then(res => {
        const $ = cheerio.load(res.data)
        $('#home .center-wrap>a').each((i, el) => {
            let url = $(el).attr('href')
            let title = $(el).find('.random_title').text()
            let reg = /(.*?)\d/igs;
            title = reg.exec(title)[1];
            fs.mkdir('./img/' + title, function(err) {
                if (err) {
                    console.log('创建失败')
                } else {
                    getImg(url, title)
                }
            })

        })
    })
}

async function getImg(url, title) {
    let res = await axios.get(url)
    const $ = cheerio.load(res.data)
    $('.pic-content img').each((i, el) => {
        let img = $(el).attr('src')
        let ext = path.extname(img)

        // 创建写入图片流
        let ws = fs.createWriteStream(`img/${title}/${title}-${i}${ext}`)
        axios.get(img, { responseType: 'stream' }).then(res => {
            console.log(res.data);

            res.data.pipe(ws)
            console.log('图片加载成功' + img)

            // 关闭写入流
            res.data.on('close', function() {
                ws.close()
            })
        })
    })
}
gogo()