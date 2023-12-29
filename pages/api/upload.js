// pages/api/upload.js

import fs from 'fs/promises';
import formidable from 'formidable';

const dbPath = './public/db.txt';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads"; // 画像を保存するディレクトリ

  return new Promise(async (resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const oldpath = files.file.path;

        // 縦か横かの選択
        const orientation = fields.orientation || 'len'; // デフォルトは縦
        const dir = `./public/uploads/${orientation}`;

        // 作者名と画像情報をDBに保存
        const data = await fs.readFile(dbPath, 'utf-8');
        const db = JSON.parse(data);

        // 対応する方向の最大 order を取得
        const maxOrder = db[orientation]?.length > 0
          ? Math.max(...db[orientation].map((image) => image.order))
          : 0;

        const imageInfo = {
          order: maxOrder + 1,
          filename: files.file.name,
          authorName: fields.authorName || "Anonymous",
          orientation: orientation,
        };

        // db に方向ごとにデータを保存
        db[orientation] = db[orientation] || [];
        db[orientation].push(imageInfo);
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        // 画像を保存
        await fs.mkdir(dir, { recursive: true });
        const newpath = `${dir}/${files.file.name}`;
        await fs.rename(oldpath, newpath);

        res.status(200).json({ success: true, order: imageInfo.order });
        resolve();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        reject();
      }
    });
  });
}
