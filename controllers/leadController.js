const Lead = require('../models/Lead')
const axios = require('axios')

const createLead = async (req, res) => {
  const { name, email, company, message } = req.body

  try {
    const newLead = new Lead({ name, email, company, message })
    await newLead.save()

    // Send to n8n webhook
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      name,
      email,
      company,
      message,
    })

    res.status(201).json({ message: 'Lead submitted successfully.' })
  } catch (err) {
    console.error('Error creating lead:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { createLead }
