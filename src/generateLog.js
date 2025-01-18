import data from "../data/transactionLog.json" with {type: 'json'}

const sub = (a, b) => a - b;

const mergeWith = (o1, o2, f) => {
  const res = { ...o1 };
  for (const [k, v] of Object.entries(o2)) {
    res[k] = res[k] ? f(res[k], v) : v;
  }
  return res;
}

const fetchAccounts = (transactions) => {
  return structuredClone(transactions.reduce((acc, transaction) => {
    acc[transaction.account] = 0;
    return acc;
  }, {}));
}

const fetchTransactionData = (transactions,type) => {
  return transactions.filter(transaction => transaction.type === type)
}

const calculateTotalAmount = ( transactions) => {
  const accounts = fetchAccounts(transactions);
  transactions.forEach(transaction => {
    accounts[transaction.account] += transaction.amount
  })
  return accounts;
} 

export const netBalance = (transactions) => {
  const credits = fetchTransactionData(transactions,'credit')
  const debits = fetchTransactionData(transactions, 'debit')
  
 const creditedAmount = calculateTotalAmount(credits)
  const debitedAmount = calculateTotalAmount(debits)
  return mergeWith(creditedAmount,debitedAmount,sub)
}
const main = () => {
  const transactions = data.transactions;
  return netBalance(transactions)
}

console.log(main());