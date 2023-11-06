const db = require('../../data/db-config')
const { getById } = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  const error = {status:400}

  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
  }
  else if (typeof name !== 'string') {
    error.message = 'name must be a string'
  }
  else if (name.trim().length<3 || name.trim().length>100) {
    error.message = 'name of account must be between 3 and 100'
    console.log(name); 
  }
  else if (typeof budget !== 'number') {
    error.message = `budget of account must be a number`
  }
  else if (budget<0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
  }
  if (error.message) {
    next(error)
  }
  else {
    req.body.name = req.body.name.trim()
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing  = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if (existing) {
      next({status: 400, message: 'that name is taken'})
    }
    else {
      next()
    }
  }
  catch (error) {
    next(error)
  }

}

exports.checkAccountId = async (req, res, next) => {
  getById(req.params.id)
    .then (exists => {
      if (exists) {
        req.account = exists
        next()
      }
      else {
        next({status: 404, message: 'account not found'})
      }
    })
    .catch (next)
}
