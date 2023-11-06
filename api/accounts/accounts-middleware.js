exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  const error = {status:400}

  if (name === undefined || budget === undefined) {
    error.message = 'name and budget required'
  }
  else if (typeof name !== 'string') {
    error.message = 'name must be a string'
  }
  else if (name.trim().length<3 || name.trim().length>100) {
    error.message = 'name must be between 3 and 100 characters'
  }
  else if (isNaN(budget)) {
    error.message = 'budget must be a number'
  }
  else if (budget<0 || budget > 1000000) {
    error.message = 'budget must be between 0 and 1,000,000'
  }
  if (error) {
    next(error)
  }
  else next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
