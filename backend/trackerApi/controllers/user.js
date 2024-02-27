require('dotenv').config();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password
    data['password'] = await bcrypt.hash(data['password'], salt);

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);

    const authenticated = await bcrypt.compare(data.password, user['password']);

    if (!authenticated) {
      throw new Error('Incorrect credentials.');
    } else {
      const token = await Token.create(user.user_id);
      res.status(200).json({ authenticated: true, token: token.token, user_id: token.user_id });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

async function getAccountById(req, res) {
  const id = req.params.id;
  try {
    const resp = await User.getOneById(id);
    res.status(200).json(resp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

//get by username
async function getAccountByUsername(req, res) {
  const username = req.params.username;
  try {
    const resp = await User.getOneByUsername(username);
    res.status(200).json(resp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

//update current balance
async function updateBalance(req,res) {
  const id = req.params.id
  try {
    const user = await User.getOneById(id)
    const resp = await user.updateCurrentBalance()
    res.status(200).json(resp);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


module.exports = {
  register,
  login,
  getAccountById,
  getAccountByUsername,
  updateBalance
};
