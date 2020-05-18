const axios = require('axios')
const fs = require('fs')
async function getData(num) {
    let url = `https://www.app-echo.com/api/recommend/sound-day?page=${num}`
    let res = await axios.get(url);
    if (!res.data.list) return
    res.data.list.forEach(element => {
        let title = element.sound.id
        let mp3 = element.sound.source
        download(title, mp3)
    });

}
const count = 1000
for (let i = 1; i < count; i++) {
    getData(i)
}

async function download(title, mp3) {
    let res = await axios.get(mp3, { responseType: 'stream' })
    let ws = fs.createWriteStream(`./mp3/${title}.mp3`)
    res.data.pipe(ws)
    res.data.on('close', function() {
        ws.close()
    })
}