import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // ya SMTP service
  auth: {
    user: process.env.EMAIL_USER, // apna Gmail
    pass: process.env.EMAIL_PASS, // app password (normal password nahi chalega)
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"E-Health System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent to", to);
  } catch (err) {
    console.error(" Email error:", err.message);
  }
};
