import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });
  
  const authHeader = req.headers.authorization;
  if (!process.env.ADMIN_SECRET_TOKEN || authHeader !== `Bearer ${process.env.ADMIN_SECRET_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id, type, data } = req.body;
  if (!id || !type || !data) return res.status(400).json({ error: 'Missing required fields' });

  const table = type === 'project' ? 'projects' : 'certificates';
  const { error } = await supabase.from(table).update(data).eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
}