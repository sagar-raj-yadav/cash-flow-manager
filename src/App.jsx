import React from 'react';
import Expensecard from './Component/Expensecard';
import TransactionList from './Component/TransactionList';
import { useState } from 'react';

const App = () => {
  const now = new Date();
  const [transactions, setTransactions] = useState([
    { id: 4, text: 'Momos', amount: -20, mode: "upi", time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
    { id: 3, text: 'Salary', amount: 97000, mode: "cash", time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
    { id: 2, text: 'Book', amount: -100, mode: "Bank transfer", time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
    { id: 1, text: 'Bonus', amount: 1500, mode: "cash", time: now.toLocaleTimeString(), date: now.toLocaleDateString() },
  ]);

  return (
    <>
      <Expensecard transactions={transactions} setTransactions={setTransactions} />
      <TransactionList transactions={transactions} />
      </>
  )
}

export default App;
