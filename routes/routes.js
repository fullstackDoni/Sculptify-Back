const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { request, response } = require('express')
const { body, validationResult, query } = require('express-validator')
const nodemailer = require('nodemailer')
const app = express()
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

router.post('/api/register', upload.single('photo'), async (req, res) => {
	try {
		const hashedPass = await bcrypt.hash(req.body.password, 10)

		const user = new User({
			fullName: req.body.fullName,
			email: req.body.email,
			password: hashedPass,
			phone: req.body.phone,
		})

		if (req.file) {
			user.photo = req.file.path
		}

		const savedUser = await user.save()

		console.log('User saved successfully:', savedUser)
		return res.status(201).json()
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/api/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })

		if (!user) {
			return res.status(401).json({ error: 'User not found' })
		}

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		)

		if (isPasswordValid) {
			res.status(200).json({ message: 'Login successful' })
		} else {
			res.status(401).json({ error: 'Incorrect password' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
	}
})
router.post('/register', (req, res) => {
	console.log(req.body);
	res.send('Registration successful');
});



module.exports = router
