// 1、数组不能进行二进制数据的操作
// 2、js数组不能像java、Python等语言效率高
// 3、buffer内存空间开辟出固定大小内存

let str = '你好！';
let buf = Buffer.from(str)
console.log(buf);
console.log('输出：' + buf.toString());