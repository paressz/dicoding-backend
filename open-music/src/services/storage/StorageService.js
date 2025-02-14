const fs = require('fs');

class StorageService {
  constructor(dir) {
    this.dir = dir;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  writeFile(file, meta, albumId) {
    const name = albumId + meta.filename;
    const path = `${this.dir}\\${name}`;
    console.log(`wr:${  path}`);
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
