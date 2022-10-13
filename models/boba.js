// import dependencies
const { kStringMaxLength } = require('buffer')
const { stringify } = require('querystring')
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const bobaRecipeSchema = new Schema(
	{
		name: String,
		recipes: String,
		description: String,

		
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const bobaRecipe = model('Boba', bobaRecipeSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = bobaRecipe
