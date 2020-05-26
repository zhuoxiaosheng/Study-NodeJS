const fs = require('fs')
let puppeteer = require('puppeteer')
let options = {
    defaultViewport: {
        width: 1400,
        height: 800
    },
    headless: false,
    slowMo: 0
};

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, res) => {
            if (!err) {
                resolve(res)
            }
        })
    })
}

(async function() {
    async function parseText(path) {
        let content = await read(path)
        let reg = /(\{.*?\})---/igs;
        let regContent;
        let txts = []
        while (regContent = reg.exec(content)) {
            let str = regContent[1]
            let json = JSON.parse(str)
            txts.push(json)
        }
        return txts
    }
    let txts = await parseText('./book.txt')
    let index = 0
    let BOM = await puppeteer.launch(options)
    async function download(txts) {
        if (index === txts.length) {
            return true
        }
        let txt = txts[index]
        index++
        let page = await BOM.newPage()
        await page.goto(txt.href)
        await page.waitForSelector('#table_files tbody .even a')
        let el = await page.$('#table_files tbody .even a')
        let href = await el.getProperty('href')
        href = href._remoteObject.value
        linkPage(href)

        // el.click()
        // let pages = await BOM.pages()
        // console.log(pages);

    }
    async function linkPage(link) {
        // 拦截谷歌请求
        await page.setRequestInterception(true)

        // 监听请求事件，并对请求进行拦截
        page.on('request', interceptedRequest => {
            // 通过url模板对请求的地址进行解析
            let urls = _url.parse(interceptedRequest.url())

            // 如果是谷歌广告请求放弃本次请求
            if (urls.hostname == 'googleads.g.doubleclick.net') {
                interceptedRequest.abort()
            } else {
                interceptedRequest.continue()
            }
        })
        let page = await BOM.newPage()
        await page.goto(link)
        await page.waitForSelector('.btn.btn-outline-secondary.fs--1')
        let el = await page.$('.btn.btn-outline-secondary.fs--1')
        el.click()
        page.on('requestfinished', (req) => {
            console.log(req.url())
        })
    }
    download(txts)
})().catch(err => {
    console.log(err);
})