const path = require('path')
const fs = require('fs')
const stylePath = path.join(__dirname, 'styles')
const bundlePath = path.join(__dirname, 'project-dist/bundle.css')

fs.readdir(stylePath, {withFileTypes: true}, (err, files) => {
    console.log(files);
    if(err) {
        throw err
    }
    const cssFiles = files.filter(file => path.extname(file.name) === '.css')
    if(!fs.existsSync(path.join(__dirname, 'project-dist'))) {
        fs.mkdirSync(path.join(__dirname, 'project-dist'))
    }
    const writeStream = fs.createWriteStream(bundlePath)
    cssFiles.forEach((cssFile) => {
        const cssPath = path.join(stylePath, cssFile.name)
        const readStream = fs.createReadStream(cssPath)
        readStream.on('data', data => writeStream.write(data))
        readStream.on('error', error => process.stdout.write('Error', error.message))         
    });
})