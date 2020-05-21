const puppeteer = require('puppeteer')

let options = {
    // 设置窗口宽高
    defaultViewport: {
        width: 1400,
        height: 800
    },
    // 设置是否显示浏览器 false为显示
    headless: false,
    //  放慢每个步骤 毫秒
    slowMo: 500
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

    // 自动点击页面跳转
    // let els = await page.$$('#menu li a');
    // els[2].click()

    // 通过输入框自动搜索
    // $ 单个获取一个 $$ 获取多个
    let inputEl = await page.$('.searchl input')

    // 让光聚焦
    await inputEl.focus()

    // 往输入框输入内容
    await page.keyboard.type('闪电侠')

    // 隐藏广告
    await page.$eval('#cs_ap_8040', function(el, val) {
        el.setAttribute('style', val)
    }, 'display: none')

    // 点击按钮
    let btn = await page.$('.searchr input')
    await btn.click()
}
test()