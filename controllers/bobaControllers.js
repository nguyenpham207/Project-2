// Import Dependencies
const express = require('express')
const Boba = require('../models/boba')

// Create router
const router = express.Router()

router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Boba.find({})
		.then(bobas => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('bobas/index', { bobas, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Boba.find({ owner: userId })
		.then(boba => {
			res.render('bobas/index', { boba, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('bobas/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Boba.create(req.body)
		.then(boba => {
			console.log('this was returned from create', boba)
			res.redirect('/bobas')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const bobaId = req.params.id
	Boba.findById(bobaId)
		.then(boba => {
			res.render('bobas/edit', { boba })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const bobaId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Boba.findByIdAndUpdate(bobaId, req.body, { new: true })
		.then(boba => {
			res.redirect(`/bobas/${boba.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const bobaId = req.params.id
	Boba.findById(bobaId)
		.then(boba => {
            const {username, loggedIn, userId} = req.session
			res.render('bobas/show', { boba, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const bobaId = req.params.id
	Boba.findByIdAndRemove(bobaId)
		.then(boba => {
			res.redirect('/bobas')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
