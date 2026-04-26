import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Change after domain verification
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #111827; margin-top: 0;">New Contact Form Submission</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>From:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              ${subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            
            <div style="background: #fffbeb; padding: 20px; border-radius: 6px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #374151;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; color: #4b5563; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Reply to ${name}
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
              Sent from your portfolio website on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}