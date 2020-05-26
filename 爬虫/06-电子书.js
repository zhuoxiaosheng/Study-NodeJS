let puppeteer = require('puppeteer')
let axios = require('axios')
let _url = require('url')
let fs = require('fs')
let options = {
    defaultViewport: {
        width: 1400,
        height: 800
    },
    headless: false,
    slowMo: 0
};

function wait(min) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('成功执行延迟函数，延迟：' + min)
        }, min)
    })
}

(async function() {
    let BOM = await puppeteer.launch(options)
    async function getMaxNumber() {
        let url = 'https://sobooks.cc/'
        let page = await BOM.newPage()

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
        list.forEach(async(element, i) => {
            await wait(8000 * i)
            getPage(element)

            // if (i === 0) {
            //     getPage(element)
            // }
        })
        page.close()

    }
    await getList(1)
    async function getPage(el) {
        let page = await BOM.newPage();

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
        await page.goto(el.href)
        let input = await page.$('.euc-y-i')
        await input.focus()
        await page.keyboard.type('512512')
        let btn = await page.$('.euc-y-s')
        await btn.click()
        await page.waitForSelector('.e-secret a').then(async res => {
            // let ell = await page.$('.e-secret  a')
            let href = await res.getProperty('href')
            href = href._remoteObject.value
            href = href.split('?url=')[1]
            let content = `{"title": "${el.title}","href": "${href}"}---\n`
            fs.writeFile('book.txt', content, { flag: 'a', encoding: 'utf-8' }, () => {
                console.log(`${el.title}写入成功！`)
                page.close()
            })

        })
    }
})().catch(err => {
    console.log(err);
})