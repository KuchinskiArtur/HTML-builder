const path = require('path')
const fs = require('fs')

const pathToFolder = path.join(__dirname, 'secret-folder')

fs.readdir(pathToFolder, (err, files) => {
    if(err) {
        console.log(err)
    } else {
        files.forEach((file) => {
            let currentPath = path.join(pathToFolder, file)
            fs.stat(currentPath, (err, stats) => {
                if(err) {
                    console.log(err) 
                } else {
                    if(stats.isFile()) {
                    console.log(file, stats.size)
                    console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size}mb`);
                    }
                }
            })
        })
    }
})