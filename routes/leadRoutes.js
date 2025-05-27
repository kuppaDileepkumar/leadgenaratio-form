const express = require('express')
const { body, validationResult } = require('express-validator')
const { createLead } = require('../controllers/leadController')

const router = express.Router()

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  createLead
)

module.exports = router
