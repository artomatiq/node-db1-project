const db = require('../../data/db-config')

const getAll = async () => {
  const result = await db('accounts')
  return result
}

const getById = async id => {
  const result = await db('accounts')
    .where('id', id).first()

  return result
}

const create = async account => {
  const [id] = await db('accounts') 
    .insert(account)

  return getById(id);
}

const updateById = async (id, changes) => {
  await db('accounts')
    .update(changes)
    .where('id', id)

  const result = getById(id)
  return result
}

const deleteById = async id => {
  const futureDel = getById(id)
  await db('accounts')
    .del('id', id)
  return futureDel
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
