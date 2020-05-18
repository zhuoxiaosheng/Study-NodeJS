/* 
开启进程
开启线程
初始化数据
while(true){
    初始化事件列表
    根据事件修改数据
    根据数据去渲染页面
}
*/

const fs = require('fs')

fs.readFile('../fs/info.json', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        zxsEvent.emit('fileSuccess', data)
    }
})

let zxsEvent = {
    event: {

    },
    on: function(name, call) {
        console.log(this.event)
        if (this.event[name]) {
            this.event[name].push(call)
        } else {
            this.event[name] = []
            this.event[name].push(call)
        }
    },
    emit: function(name, msg) {
        if (this.event[name]) {
            this.event[name].forEach(item => {
                item(msg)
            });
        }
    }
}

zxsEvent.on('fileSuccess', function() {
    console.log('1、数据获取成功');
})

zxsEvent.on('fileSuccess', function() {
    console.log('2、遍历数据');
})

zxsEvent.on('fileSuccess', function() {
    console.log('3、渲染页面');
})