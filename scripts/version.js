const path = require('path');
const fs = require('fs-extra');

// this loads package.json
// then you destructure that object and take out the 'version' property from it
// and finally with ': appVersion' you rename it to const appVersion:
const { version: appVersion } = require('../package.json')
const file = path.resolve(__dirname, '..', 'src', 'app', 'config', 'app.version.ts');

fs.writeFileSync(
    file,
    `export const VERSION:string = ${JSON.stringify(appVersion)};` ,
    { encoding: 'utf-8' });

console.log(`Wrote version info ${appVersion} to ${path.relative(path.resolve(__dirname, '..'), file)}`);