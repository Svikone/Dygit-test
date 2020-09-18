import fs from 'fs';

class Expansion {
  constructor() {
    this.permittedTypes = [
      'image/png', 'image/jpeg',
    ];
  }

  deleteImg(urlImg) {
    fs.unlinkSync(`file/uploads/${urlImg}`);
  }

  fileFilter(mimetype) {
    const permision = this.permittedTypes.find((type) => type === mimetype);
    return permision;
  }
}

module.exports = new Expansion();