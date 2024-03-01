const db = require("../database/connect")

class Transactions {
  constructor({ transaction_id, user_id, reference,category, amount}) {
    this.transaction_id = transaction_id;
    this.user_id = user_id;
    this.reference = reference;
    this.category = category;
    this.amount = amount;
  }

  //get one by id
  static async getOneById(id) {
    const response = await db.query('SELECT * FROM transactions WHERE transaction_id = $1', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate transaction.');
    }
    return new Transactions(response.rows[0])
  }  
  //get all by account
  static async getAllByAccount(id) {
    const response = await db.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_id DESC', [
      id,
    ]);
   
    return response.rows.map(t=> new Transactions(t));
  }  
  //create transaction
  static async create(data) {
    console.log(data)
    const response = await db.query('INSERT INTO transactions (user_id, reference, category, amount) VALUES ($1,$2,$3,$4) RETURNING *', [data.user_id, data.reference,data.category,data.amount]);
    if (response.rows.length != 1) {
      throw new Error('Unable to create transactions.');
    }
    return new Transactions(response.rows[0])
  }  

  //delete transaction
  async delete() {
    const response = await db.query('DELETE FROM transactions WHERE transaction_id=$1 RETURNING *',[this.transaction_id])
    if (response.rows.length !=1) {
      throw new Error('Unable to delete transactions.')
    }
    return new Transactions(response.rows[0])

  }

}

module.exports = Transactions