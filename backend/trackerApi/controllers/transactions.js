const Transactions = require("../models/Transactions")
const User = require("../models/User")

//get all by account
async function getAllByAccount(req,res) {
  const id = req.params.id
  try {
    const resp = await Transactions.getAllByAccount(id)
    res.status(200).json(resp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


//create transaction (and update)
async function createTransaction(req,res) {
  const data = req.body
  try {
    const resp = await Transactions.create(data)
    const updatingUser = await User.getOneById(data.user_id)
    const balance = updatingUser.updateCurrentBalance()
    res.status(200).json(resp)
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
//delete transaction (and update)
async function deleteTransaction(req,res) {
  const data = req.body

  try {
    const transaction = await Transactions.getOneById(data.transaction_id)
    const resp = await transaction.delete()
    const updatingUser = await User.getOneById(data.user_id)
    const balance = updatingUser.updateCurrentBalance()
    res.status(200).json(resp)
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


module.exports = {
  getAllByAccount,
  createTransaction,
  deleteTransaction
};
