import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../utils/database.utils';

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const conn = await db();
  res.statusCode = 200
  res.json({ name: 'Joe Spagetthi' })
}
