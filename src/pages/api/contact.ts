export const prerender = false;

import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

const apiKey = import.meta.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, reason, message } = data;

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`New contact form submission from ${name} (${email})`);

    const msg = {
      to: import.meta.env.SENDGRID_FROM_EMAIL,  
      from: import.meta.env.SENDGRID_FROM_EMAIL,  
      replyTo: email,
      subject: `New Contact Form Submission: ${reason.toUpperCase()}`,
      text: `
Name: ${name}
Email: ${email}
Reason: ${reason}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Reason:</strong> ${reason}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #555;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    };

    // Send email 
    await sgMail.send(msg);

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Failed to send email:', error?.message, error?.response?.body);
    
    return new Response(
      JSON.stringify({ 
        message: 'Failed to send email. Please try again later.',
        error: import.meta.env.DEV ? error?.message : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};