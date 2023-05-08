const path = require('path')
const fs = require('fs');

const newFolder = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const newAssetsPath = path.join(newFolder, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const newStylesPath = path.join(__dirname, 'project-dist', 'style.css');
const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(newFolder, 'index.html');
const components = path.join(__dirname, 'components');

async function buildPage() {
    try {
        await fs.promises.rm(newFolder, {recursive: true, force: true})
        await fs.promises.mkdir(newFolder, {recursive: true})
        await copyDir(assetsPath, newAssetsPath)
        await newHtml(templatePath, indexPath)
        await addStyles(path.join(newFolder, 'style.css'))
    }
    catch (err) {
        console.log(err);
    }
}

async function copyDir(assets, assetsCopy) {
    await fs.promises.mkdir(assetsCopy, {recursive: true})
    const files = await fs.promises.readdir(assets)

    for(let file of files) {
        const assetsFile = path.join(assets, file)
        const assetsCopyFile = path.join(assetsCopy, file)
        const stats = await fs.promises.stat(assetsFile)

        if(stats.isDirectory()) {
            await copyDir(assetsFile, assetsCopyFile)
        } else {
            await fs.promises.copyFile(assetsFile, assetsCopyFile)
        }
    }
}

async function addStyles() {
    const fileNames = await fs.promises.readdir(stylesPath, {withFileTypes: true})
    const writeStream = fs.createWriteStream(newStylesPath)
    for(let fileName of fileNames) {
    const ext = path.parse(fileName.name).ext
    if(fileName.isFile() === true && ext === '.css') {
        const readStream = fs.createReadStream(path.join(stylesPath, fileName.name))

        readStream.on('data', data => writeStream.write(data))
        readStream.on('error', errir => console.log('Error', error.message))
        }
    }
}

async function newHtml(template, index) {
    let html = ''
    const createReadStream = fs.createReadStream(template, {encoding: 'utf-8'})
    
    for await(let info of createReadStream) {
        html += info
        console.log(info);
    }
    await addInfo(html, index)
}

async function addInfo(html, index) {
    const objHtml = {}
    const files = await fs.promises.readdir(components)
    let count = 0;

    for(let file of files) {
        const pathFile = path.join(components, file)
        const pathFileCount = file.replace(path.extname(file), '')
        objHtml[pathFileCount] = ''
       
        const readStream = fs.createReadStream(path.join(pathFile))
        readStream.on('data', (info) => {
            objHtml[pathFileCount] += info.toString()
        })
        readStream.on('end', () => {
            count++
            if(count >= files.length) {
                for(let element in objHtml) {
                html = html.replace('{{' + element + '}}', objHtml[element]);      
                }
            const htmlStream = fs.createWriteStream(index, {encoding: 'utf-8'})
            htmlStream.write(html)
            }
        })
    }
}



buildPage();