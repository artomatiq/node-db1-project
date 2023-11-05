const Accounts = require('./accounts-model')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then (accounts => {
      res.status(200).json(accounts)
    })
    .catch (next)
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: (err.message || 'error in the Accounts router'),
    stack: err.stack
  })
})

module.exports = router;
