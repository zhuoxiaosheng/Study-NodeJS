const url = require('url');

console.log(url);

let http = 'https://item.mi.com/product/10000213.html?selected=10000213&pClass=p';
console.log(url.parse(http));

let target = 'http://www.taobao.com'
http = './xx/xx.html'

let newUrl = url.resolve(target, http);
console.log(newUrl);