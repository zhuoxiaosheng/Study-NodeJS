let puppeteer = require('puppteer')
let axios = require('axios')



let options = {
    defaultViewport: {
        width: 1400,
        height: 800
    },
    haadless: false,
    slowMo: 250
}

(async function() {
    let BOM = await puppeteer.launch(options)
    let url = 'https://sobooks.cc/'
    async function getMaxNumber() {
        let page = BOM.newPage()
        await page.goto(url)
    }
})()


// 目标： 1、获取网站所有电子书名及连接


// 2、获取列表所有连接


//