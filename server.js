const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  console.log("POST /contact received");
  console.log("Body:", req.body);
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kellenag115@gmail.com",
      pass: "gscg akrt qthu iozy",
    },
  });

const mailOptions = {
  from: `"Website Contact Form" <kellenag115@gmail.com>`,
  to: "kellenag115@gmail.com",
  replyTo: email,
  subject: `New message from ${name}`,
  text: `
Name: ${name}
Email: ${email}

Message:
${message}
`,
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
