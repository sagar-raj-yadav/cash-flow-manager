import React, { useState } from 'react';
import jsPDF from 'jspdf';
import PieCharts from './PieChart'; // Import the PieCharts component

export const Transaction = ({ transaction }) => {
  return (
    <div style={{ ...styles.container, color: transaction.amount < 0 ? 'red' : 'green' }}>
      <p>{transaction.id}</p>
      <p>{transaction.text}</p>
      <p>{transaction.amount}</p>
      <p>{transaction.mode}</p>
      <p>{transaction.time}</p>
      <p>{transaction.date}</p>
    </div>
  );
};

const TransactionsList = ({ transactions }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10; // Initial y position for text

    transactions.forEach((transaction, index) => {
      doc.text(`Id: ${transaction.id}`, 10, y + index * 10);
      doc.text(`Text: ${transaction.text}`, 30, y + index * 10);
      doc.text(`Amount: ${transaction.amount}`, 70, y + index * 10);
      doc.text(`Mode: ${transaction.mode}`, 120, y + index * 10);
      doc.text(`Date: ${transaction.date}`, 170, y + index * 10);
    });

    doc.save('transactions.pdf');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('text'); // Default search option
  const [filterType, setFilterType] = useState('ALL'); // Default filter type
  const [showCharts, setShowCharts] = useState(true); // State to manage pie chart visibility

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleToggleCharts = () => {
    setShowCharts(prevShowCharts => !prevShowCharts);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const isMatch = searchOption === 'amount'
      ? transaction[searchOption].toString().includes(searchQuery.toLowerCase())
      : transaction[searchOption].toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'ALL') return isMatch;
    if (filterType === 'Expense') return transaction.amount < 0 && isMatch;
    if (filterType === 'Income') return transaction.amount >= 0 && isMatch;
    if (filterType === 'Loan') return transaction.text.toLowerCase() === 'loan' && isMatch;
  });

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}><u>Transaction History</u></h1>
      
      <div style={styles.searchcontainer}>
        <label>Filter By:</label>
        <input
          style={styles.searchbar}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by"
        />
        <select value={searchOption} onChange={handleOptionChange} style={styles.select}>
          <option value="text">Text</option>
          <option value="amount">Amount</option>
        </select>
        <select value={filterType} onChange={handleFilterChange} style={styles.select}>
          <option value="ALL">ALL</option>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="Loan">Loan</option>
        </select>
      </div>

      <div style={{ ...styles.container}}>
        <h3><u>id</u></h3>
        <h3><u>Text</u></h3>
        <h3><u>Amount</u></h3>
        <h3><u>Mode</u></h3>
        <h3><u>Time</u></h3>
        <h3><u>Date</u></h3>
      </div>

      {filteredTransactions.map(transaction => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
      
      <button style={styles.button} onClick={generatePDF}>Download All Transactions</button>
      <button style={styles.button} onClick={handleToggleCharts}>
        {showCharts ? 'Hide Pie Charts':'Show Pie Charts'  }
      </button>

      {showCharts && <PieCharts transactions={transactions} />}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    border: "2px solid #F6F6F6",
    padding: "6px"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    marginRight: "10px"
  },
  container2: {
    marginTop: "20px",
    display: "flex",
  },
  itemss: {
   marginRight: "15%",
    fontWeight: "bold",
    fontSize: "20px",
  },
  searchcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px"
  },
  searchbar: {
    padding: "10px",
    borderRadius: "10px",
    fontSize: "16px",
    width: "30%",
    marginRight: "10px"
  },
  select: {
    padding: "7px",
    borderRadius: "6px",
    fontSize: "16px",
    marginRight:"10px"
  },
  chartContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px"
  },
  chart: {
    width: '45%'
  }
};

export default TransactionsList;
