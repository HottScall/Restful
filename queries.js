const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'local host',
  database: 'api',
  password: 'password',
  port: 5432;
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUsersById = (request, response) => {
  const id = parseINT(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const {
    name,
    email
  } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertID}`)
  })
}

const updateUser = (request, response) => {
  const id = parseINT(request.params.id)
  const {
    name,
    email
  } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`USER modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) =>{
  const id = parseINT(request.params.id)

  pool.query('DELETE FROM users WHERE ID = $1', [id], (error, results) =>{
    if (error){
      throw error
    }
    response.status(200).send(`USER deleted with ID: ${id}`)
  })
}


module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
