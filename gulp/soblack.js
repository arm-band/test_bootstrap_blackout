const fs     = require('fs');
const dir    = require('./dir');
const honokaPath = './node_modules/bootstrap-honoka/scss/honoka/';
const scssAssetsPath = '/bootstrap/honoka/';
const honokaFile = '_honoka.scss';

const isExistFile = (file) => {
    try {
        fs.statSync(file);
        return true;
    } catch(err) {
        if(err.code === 'ENOENT') {
            return false;
        }
    }
}

if(isExistFile(`${honokaPath}${honokaFile}`) && !isExistFile(`${dir.src.scss}${dir.src.scssassets}${scssAssetsPath}${honokaFile}`)) {
    fs.writeFileSync(`${dir.src.scss}${dir.src.scssassets}${scssAssetsPath}${honokaFile}`, fs.readFileSync(`${honokaPath}${honokaFile}`, 'utf8'), (err) => {
        if(err) {
            console.log(err);
        }
    });
}
