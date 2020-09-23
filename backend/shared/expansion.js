import fs from 'fs';

class Expansion {
  constructor() {
    this.permittedTypes = [
      'image/png', 'image/jpeg',
    ];
    this.path = 'file/uploads/';
    this.pageLimit = 10;
  }

  deleteImg(urlImg) {
    fs.unlinkSync(`${this.path}${urlImg}`);
  }

  fileFilter(mimetype) {
    const permision = this.permittedTypes.find((type) => type === mimetype);
    return permision;
  }

  async pagination(page, model, options) {
    const collections = await model.countDocuments({ userId: options });
    let pages = collections / this.pageLimit;
    pages = pages % 1 == 0 ? pages : parseInt(pages + 1);
    return {
      page: page || 1,
      collections,
      pages,
      skip: page > 1 ? (page * 10) - 10 : 0,
    };
  }
}

module.exports = new Expansion();
