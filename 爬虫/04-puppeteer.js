const puppeteer = require('puppeteer')

let options = {
    // 设置窗口宽高
    defaultViewport: {
        width: 1400,
        height: 800
    },
    // 设置是否显示浏览器 false为显示
    headless: false
}
async function test() {
    // 开启浏览器
    let BOM = await puppeteer.launch(options);
    // 打开页面
    let page = await BOM.newPage()
    await page.goto('https://www.dytt8.net/')
    await page.screenshot({
        path: 'screenshot.png',
    })

    // await page.$$('#menu li a'）

    let elements = await page.$$eval('#menu li a', el => {
        let els = []
        el.forEach(item => {
            if (item.getAttribute('href') !== '#') {
                let obj = {
                    href: item.getAttribute('href'),
                    title: item.innerHTML
                }
                els.push(obj)
            }

        })
        return els
    })
    console.log(elements)

    // 打开新页面
    let goPage = await BOM.newPage()
    await goPage.goto(elements[1].href)



    //  在浏览器console打印 并不是控制台打印
    // await page.on('console', (msg) => {
    //     console.log(msg);
    // })
}
test()