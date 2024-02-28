const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, initial_balance, current_balance,currency}) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.initial_balance = initial_balance;
    this.current_balance = current_balance;
    this.currency = currency;

  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password, initial_balance,current_balance,currency } = data;
    let response = await db.query(
      'INSERT INTO users (username, password,initial_balance,current_balance,currency) VALUES ($1, $2, $3,$4,$5) RETURNING user_id;',
      [username, password, initial_balance,current_balance,currency]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to create user.');
    }
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async updateCurrentBalance() {
    let balanceQuery = await db.query('SELECT amount FROM transactions WHERE user_id = $1;', [this.user_id]);
    let newBalance =parseFloat(this.initial_balance);
    for (let i = 0; i<balanceQuery.rows.length;i++) {
      newBalance -= parseFloat(balanceQuery.rows[i].amount)
    }
    let response = await db.query(
      'UPDATE users SET current_balance = $1 WHERE user_id = $2 RETURNING *;',[newBalance,this.user_id]
    )
    if (response.rows.length != 1) {
      throw new Error('Unable to update balance')
    }
    return new User(response.rows[0])
  }



}


module.exports = User;
