import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // NodeMailer transporter for Gmail SSL
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // smtp.gmail.com
      port: Number(process.env.SMTP_PORT), // 465
      secure: true,                      // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,       // allow self-signed certs
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,        // sender
      to: process.env.CONTACT_EMAIL,       // your receiving email
      subject: `New Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  }  catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
  // handle other types of errors
}
}
