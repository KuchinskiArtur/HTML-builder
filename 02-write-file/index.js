const path = require('path')
const fs = require('fs')

const {stdin, stdout} = process

const newFile = fs.createWriteStream(path.join(__dirname, 'text.txt'))
stdout.write('Hello\n')

stdin.on('data', data => {
    if(data.toString().trim() === 'exit') {
        exitInfo()
    }
    newFile.write(data)
})

process.on('SIGINT', exitInfo)

function exitInfo() {
    stdout.write('by');
    process.exit()
}