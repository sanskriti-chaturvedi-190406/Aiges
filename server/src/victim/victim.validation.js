const { REQUEST_CATEGORIES, URGENCY_LEVELS } = require('./victim.model')

const registerVictimSchema = {
  name:               { required: true,  type: 'string', minLength: 2,  maxLength: 100 },
  phone:              { required: true,  type: 'string', minLength: 5,  maxLength: 20  },
  email:              { required: false, type: 'string',                maxLength: 254 },
  address:            { required: true,  type: 'string', minLength: 5,  maxLength: 500 },
  householdSize:      { required: false, type: 'number', min: 1,        max: 100       },
  accessibilityNeeds: { required: false, type: 'string',                maxLength: 500 },
}

const updateProfileSchema = {
  name:               { required: false, type: 'string', minLength: 2, maxLength: 100 },
  phone:              { required: false, type: 'string', minLength: 5, maxLength: 20  },
  email:              { required: false, type: 'string',               maxLength: 254 },
  address:            { required: false, type: 'string', minLength: 5, maxLength: 500 },
  householdSize:      { required: false, type: 'number', min: 1,       max: 100       },
  accessibilityNeeds: { required: false, type: 'string',               maxLength: 500 },
}

const createRequestSchema = {
  category: { required: true,  type: 'string', enum: REQUEST_CATEGORIES          },
  urgency:  { required: true,  type: 'string', enum: URGENCY_LEVELS              },
  location: { required: true,  type: 'string', minLength: 3,  maxLength: 500     },
  details:  { required: true,  type: 'string', minLength: 10, maxLength: 1000    },
  contact:  { required: false, type: 'string',                maxLength: 20      },
}

module.exports = { registerVictimSchema, updateProfileSchema, createRequestSchema }
