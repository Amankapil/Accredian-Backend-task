const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
// require('dotenv').config()

const prisma = new PrismaClient()
const app = express()
const port = 5000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amankapil60@gmail.com',
    pass: 'wvfz zara xyre zclz'
  }
})

app.get('/api/ad', async (req, res) => {
  res.send('flex')
})
app.post('/api', async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } =
    req.body

  console.log(req.body)
  if (
    !referrerName ||
    !referrerEmail ||
    !refereeName ||
    !refereeEmail ||
    !course
  ) {
    console.log('data')
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    //     const referral = await prisma.referral.create({
    //       data: { referrerName, referrerEmail, refereeName, refereeEmail, course }
    //     })

    const mailOptions = {
      from: referrerEmail,
      to: refereeEmail,
      subject: 'Course Referral',
      text: `Hello ${refereeName},\n\n${referrerName} has referred you to the course: ${course}.`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending email' })
      }
      console.log('mail sent success')
      // return res.send(200)
      res.status(200).send({ success: 'mail sent success' })
    })
  } catch (error) {
    res.status(350).send({ error: 'Error creating referral' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
