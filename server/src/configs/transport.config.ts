import nodemailer from 'nodemailer';
import { env } from './env.configs'; // Assuming your environment variables are stored in this file



export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'sendgrid', 'mailgun', etc.
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD, 
  },
});
