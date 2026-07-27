const db = require('../config/db.js')

exports.findUserById = async(id) => {
    const query = "SELECT id, name, email, created_at FROM users WHERE id = $1";
    const {rows } = await db.query(query, id);
    return rows[0];
        
};

exports.findByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  
  // Safely check if result and rows exist
  if (result && result.rows && result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
};

exports.createUser = async(name, email, hashedPassword) => {
    const query = "INSERT into users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at";
    const {rows} =await db.query(query, [name, email, hashedPassword]);
    return rows[0];
};

