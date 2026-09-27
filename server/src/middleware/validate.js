const ApiError = require('../utils/ApiError')

/**
 * validate — request body validation middleware factory.
 *
 * Schema field rules:
 *   required   boolean
 *   type       'string' | 'number' | 'array'
 *   minLength  number  (strings)
 *   maxLength  number  (strings)
 *   enum       string[]
 *   min        number  (numbers)
 *   max        number  (numbers)
 */
function validate(schema) {
  return (req, _res, next) => {
    const errors = []
    const body = req.body || {}

    for (const [field, rules] of Object.entries(schema)) {
      const value = body[field]
      const isEmpty = value === undefined || value === null || value === ''

      if (rules.required && isEmpty) {
        errors.push({ field, message: `${field} is required` })
        continue
      }
      if (isEmpty) continue

      if (rules.type) {
        const actualType = Array.isArray(value) ? 'array' : typeof value
        if (actualType !== rules.type) {
          errors.push({ field, message: `${field} must be of type ${rules.type}` })
          continue
        }
      }

      if (typeof value === 'string') {
        if (rules.minLength !== undefined && value.trim().length < rules.minLength)
          errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` })
        if (rules.maxLength !== undefined && value.trim().length > rules.maxLength)
          errors.push({ field, message: `${field} must be at most ${rules.maxLength} characters` })
        if (rules.enum && !rules.enum.includes(value))
          errors.push({ field, message: `${field} must be one of: ${rules.enum.join(', ')}` })
      }

      if (typeof value === 'number') {
        if (rules.min !== undefined && value < rules.min)
          errors.push({ field, message: `${field} must be at least ${rules.min}` })
        if (rules.max !== undefined && value > rules.max)
          errors.push({ field, message: `${field} must be at most ${rules.max}` })
      }
    }

    if (errors.length > 0) return next(new ApiError(400, 'Validation failed', errors))
    next()
  }
}

module.exports = validate
