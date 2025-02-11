const fs = require('fs');

class StorageService {
  constructor(dir) {
    this.dir = dir;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  writeFile(file, meta) {
    const name = +new Date() + meta.filename;
    const path = `${this.dir}/${name}`;
    const wrStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
      wrStream.on('error', (err) => {
        console.error(err);
        reject(err);
      });
      file.pipe(wrStream);
      file.on('end', () => resolve(name));
    });
  }
}
module.exports = StorageService;