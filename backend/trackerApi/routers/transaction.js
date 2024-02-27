const { Router } = require('express');

const transactionController = require("../controllers/transactions")

const transactionRouter = Router()


transactionRouter.get('/transactions/:id',transactionController.getAllByAccount)
transactionRouter.post('/transaction',transactionController.createTransaction)
transactionRouter.delete('/transaction',transactionController.deleteTransaction)



module.exports = transactionRouter;
