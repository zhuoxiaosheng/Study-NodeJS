let puppeteer = require('puppeteer')
let axios = require('axios')



let options = {
    defaultViewport: {
        width: 1400,
        height: 800
    },
    headless: false,
    slowMo: 250
};

(async function() {
    let BOM = await puppeteer.launch(options)
    async function getMaxNumber() {
        let url = 'https://sobooks.cc/'
        let page = await BOM.newPage()
        await page.goto(url)
        let number = await page.$eval('.pagination li:last-child span', el => {
            let str = el.innerHTML
            let number = str.substr(1, str.length - 2)
            number = number.trim()
            return number;
        })
        return number;
    }
    let allNumber = await getMaxNumber()
    async function getList(num) {
        let url = 'https://sobooks.cc/page/' + num
        let page = await BOM.newPage()
        await page.goto(url)

        let list = await page.$$eval('#cardslist .thumb-img>a', el => {
            let list = []
            el.forEach(item => {
                let obj = {
                    title: item.getAttribute('title'),
                    href: item.getAttribute('href')
                }
                list.push(obj)
            })
            return list
        })
        list.forEach((element, i) => {
            if (i === 0) {
                getPage(element)
            }
        })
        page.close()
    }
    await getList(1)
    async function getPage(el) {
        let page = await BOM.newPage();
        await page.goto(el.href)
        let input = await page.$('.euc-y-i')
        await input.focus()
        await page.keyboard.type('512512')
        let btn = await page.$('.euc-y-s')
        await btn.click()
        await page.waitForSelector('.e-secret a').then(async res => {
            // let ell = await page.$('.e-secret  a')
            let x = await res.getProperty('href').jsonValue()
            console.log(x)
        })

        // setTimeout(async() => {
        //     let ell = await page.$('.e-secret')
        //     console.log(ell)
        // }, 2000)
    }
})().catch(err => {
    console.log(err);
})


// 目标： 1、获取网站所有电子书名及连接


// 2、获取列表所有连接


//