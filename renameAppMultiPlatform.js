const fs = require('fs');
const path = require('path');

const sourceDir = './target'; // o donde esté tu .jar
const targetPath = '../app.jar';

const jarFile = fs.readdirSync(sourceDir).find(f => f.endsWith('.jar'));
if (!jarFile) {
  console.error('No se encontró ningún archivo .jar');
  process.exit(1);
}

fs.copyFileSync(path.join(sourceDir, jarFile), targetPath);
console.log(`Copiado ${jarFile} como app.jar. Build Completa`);
