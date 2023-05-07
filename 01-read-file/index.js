const path = require('path');
const fs = require('fs');

const readPath = fs.ReadStream(path.join(__dirname, 'text.txt')).pipe(process.stdout)