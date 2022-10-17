// import dependencies
// const { kStringMaxLength } = require('buffer')
// const { stringify } = require('querystring')
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const bobaSchema = new Schema(
	{

		name: String,
		recipes: String,
		description: String,
		// owner: String,
		
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Boba = model('Boba', bobaSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Boba
