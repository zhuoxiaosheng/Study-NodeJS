const puppeteer = require('puppeteer')

async function test() {
    // 开启浏览器
    let BOM = await puppeteer.launch({ headless: false });
    // 打开页面
    let page = await BOM.newPage()
    page.goto('http://zhuoxiaosheng.cn')
}
test()