import { timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const envHash = process.env.ADMIN_PASSWORD;

  // Fail safely if env var is missing or password isn't a string
  if (!envHash || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Convert both to buffers for constant-time comparison
  const inputBuffer = Buffer.from(password, 'utf-8');
  const storedBuffer = Buffer.from(envHash, 'utf-8');

  // Must be same length to avoid timing attacks
  if (inputBuffer.length !== storedBuffer.length) {
    return res.status(401).json({ valid: false });
  }

  // Secure comparison (prevents timing attacks)
  const isValid = timingSafeEqual(inputBuffer, storedBuffer);
  
  return res.status(isValid ? 200 : 401).json({ valid: isValid });
}