const fs = require('fs');
fs.unlink('删除.txt', function() {
    console.log('删除成功')
})