export default async (req, res) => {
  const { contact } = req.query;
  // const nodemailer = require('nodemailer')

  // const transporter = nodemailer.createTransport({
  //   port: 465,
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  //   secure: true,
  // })
  // const { username,email } = req.body;
  //     try{
  //       await transporter.sendMail({
  //         from: 'todo.sarun@gmail.com',
  //         to: email,
  //         subject: `Contact form submission from TesterTODOLISTS`,
  //         html: `<h1>You have a contact form submission ${username} !!</h1><br>
  //           <p><strong>Email: </strong> ${email}</p><br>
  //           <h1><a href='http://localhost:3000/verifycation/${contact}'>Click</a></h1>
  //           <h1>id is : ${contact}</h1>
  //         `
  //       }); 
  //       return res.status(200).json("Email sender SUCCESS!!");
  //   }catch(err){
  //       return res.status(500).send("serverERROR")
  //   }

  const nodemailer = require('nodemailer');
  const {username,email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "mailhog",
    port: 1025,
  });
  try {
    await transporter.sendMail({
      from: 'My Company <company@companydomain.org>',
      to: email,
      subject: "Hi Mailhog!",
      text: `<h1>This is the email content</h1></br>
      <h1>You have a contact form submission ${username} !!</h1><br>
                 <p><strong>Email: </strong> ${email}</p><br>
              <h1>id is : ${contact}</h1>  
      `,
    });
    return res.status(200).json("Email sender SUCCESS!!");
  } catch (err) {
    res.status(500).send("serverERROR")
  }
}