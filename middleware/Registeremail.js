import nodemailer from 'nodemailer';

export default async function sendEmail(req, res) {
  // Create a transporter object using the sendmail transport
  const transporter = nodemailer.createTransport({
    sendmail: true,
  });

  // Define the email options
  const mailOptions = {
    from: 'sender@example.com',
    to: 'todo.sarun@gmail.com',
    subject: 'Hello, world!',
    html: '<p>This is a test email</p>',
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
}
