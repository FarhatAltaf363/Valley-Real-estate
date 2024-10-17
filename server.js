const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cos');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ikamranahmad09@gmail.com',
        pass: 'xwee erqu vugg svip',
    }
});

app.post('/submit-form', (req, res) => {
    const { name, email, contact, message } = req.body;

    const mailOptions = {
        from: 'ikamranahmad09@gmail.com',
        to: 'ikamranahmad09@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new contact form submission.\n\nDetails:\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending the message.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Form submitted successfully! We will get back to you shortly.');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
