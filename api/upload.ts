// api/upload.ts
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const adminToken = process.env.ADMIN_SECRET_TOKEN;
  
  if (!adminToken || authHeader !== `Bearer ${adminToken}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { type, title, description, imageUrl, tags, links, issuer, date } = req.body;

    if (!type || !title || !description || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const table = type === 'project' ? 'projects' : 'certificates';

    // ✅ Build payload based on content type
    const payload: any = {
      title,
      description,
      image_url: imageUrl,
      created_at: new Date().toISOString(),
    };

    // Projects get tags and links
    if (type === 'project') {
      payload.tags = Array.isArray(tags) ? tags : [];
      payload.links = links || {};
    } 
    // Certificates get issuer, date, and links
    else if (type === 'certificate') {
      payload.issuer = issuer || '';
      payload.date = date || '';
      payload.links = links || {};
    }

    const { error } = await supabase.from(table).insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully` 
    });
  } catch (err) {
    console.error('Upload handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}