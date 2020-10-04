import fs from 'fs';

export function deleteImg(urlImg) {
  const path = 'file/uploads/';
  fs.unlinkSync(`${path}${urlImg}`);
}

export function fileFilter(mimetype) {
  const permittedTypes = ['image/png', 'image/jpeg'];
  const permision = permittedTypes.find((type) => type === mimetype);
  return permision;
}

export async function pagination(page, model, options) {
  const pageLimit = 10;
  const collections = await model.countDocuments({ userId: options });
  let pages = collections / pageLimit;
  pages = pages % 1 == 0 ? pages : parseInt(pages + 1);
  return {
    page: page || 1,
    collections,
    pages,
    skip: page > 1 ? (page * 10) - 10 : 0,
  };
}
