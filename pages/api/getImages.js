import fs from 'fs/promises';

const dbPath = './public/db.txt';

export default async function handler(req, res) {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    res.status(200).json(db);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}