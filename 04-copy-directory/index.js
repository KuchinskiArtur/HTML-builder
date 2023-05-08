
const path = require('path')
const fs = require('fs')
const {copyFile } = require('node:fs/promises');

const files = path.join(__dirname, 'files')
const copyFiles = path.join(__dirname, 'files-copy')

async function copyDir() {
    fs.mkdir(copyFiles, {recursive: true}, (err) => {
        if(err) {
          throw err
        } else {
            console.log('new files');
        }
    })
}

fs.readdir(files, (err, files) => {
    if(err) {
        throw err
    }
    files.forEach((file) => {
        const oneFilePath = path.join(__dirname, 'files', file)
        const copyOneFile = path.join(__dirname, 'files-copy', file)
        copyFile(oneFilePath, copyOneFile)
        console.log(file);
    })
})
copyDir()