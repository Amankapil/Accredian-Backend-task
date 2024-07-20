const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()

const prisma = new PrismaClient()
const app = express()
const port = 5000
const cors = require('cors')

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'https://accredian-frontend-task-smx9.vercel.app/'
//   ], // Replace with your frontend URLs
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// })

// https://accredian-backend-task-dv4x.onrender.com/api

app.get('/api/ad', async (req, res) => {
  res.send('flex')
})
app.post('/api', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } =
    req.body

  if (
    !referrerName ||
    !referrerEmail ||
    !refereeName ||
    !refereeEmail ||
    !course
  ) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const referral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail, course }
    })

    // const mailOptions = {
    //   from: 'amankapil60@gmail.com',
    //   to: refereeEmail,
    //   subject: 'Course Referral',
    //   text: `Hello ${refereeName},\n\n${referrerName} has referred you to the course: ${course}.`
    // }

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error('Error sending email:', error)
    //     return res.status(500).json({ error: 'Error sending email' })
    //   }
    //   console.log('Mail sent:', info.response)
    res
      .status(200)
      .json({ message: 'Referral submitted successfully', referral })
    // })
  } catch (error) {
    console.error('Error creating referral:', error)
    res.status(500).json({ error: 'Error creating referral' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
