import nodemailer from 'nodemailer';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { email, message } = JSON.parse(event.body || '{}');
    if (!email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing email or message' }) };
    }

    const user = process.env.SMTP_USER || process.env.REACT_APP_SMTP_USER || 'info@damascusgin.com';
    const pass = process.env.SMTP_PASS || process.env.REACT_APP_SMTP_PASS || '';
    const host = process.env.SMTP_HOST || process.env.REACT_APP_SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || process.env.REACT_APP_SMTP_PORT || 465);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Damascus Gin <${user}>`,
      to: 'info@damascusgin.com',
      subject: 'Contact form message',
      text: `From: ${email}\n\n${message}`,
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email', detail: err?.message }) };
  }
};


