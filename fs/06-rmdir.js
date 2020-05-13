const fs = require('fs');

fs.rmdir('./test', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('删除成功')
    }
})