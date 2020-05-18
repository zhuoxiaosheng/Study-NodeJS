let axios = require('axios')
let fs = require('fs')
let url = 'https://vip.1905.com/List'


function request(url) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(res => {
            resolve(res);
        })
    })
}

async function getUrl() {
    let res = await request(url);
    let reg = /<li class="clearfix_smile"><div class="fl clr6 label">(.*?)<\/div><div class="f_song con clearfix_smile"><a .*? href="(.*?)">.*?/igs;
    let data = res.data;
    let movieName = []
    while (res = reg.exec(data)) {
        console.log(res[1])
        let reg = /<\/div>/;
        reg = reg.exec(res[1])
        let str;
        if (reg) {
            str = reg['input'].substr(0, reg['index'])
        }
        // console.log(str)
        str = str ? str : res[1]
        movieName.push(str)
        console.log(movieName)
    }
}
getUrl()