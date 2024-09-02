import React, { useState } from 'react';

const Loan = ({ setTransactions }) => {
  const [amount, setAmount] = useState('');
  const [count, setcount] = useState(1); 
 
  const addLoan = () => {
    const now = new Date();
    const loanTransaction = {
      id:'L' +count, 
      text: 'Loan',
      amount: Math.abs(+amount),
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
      mode: 'loan'
    };

  }

  return (
<>
    <div style={styles.container}>
      <h5 style={{ margin: "0 0 20px 100px", fontSize: "25px" }}>Take Loan</h5>
      <div>
        <label>Loan Amount:</label>
        <input
          type="number"
          style={styles.inputt}
          placeholder="Enter Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button style={styles.styledButton} onClick={addLoan} >
        Add Loan
      </button>
    </div>

</>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  inputt: {
    width: "95%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1em",
    transition: "border-color 0.3s"
  },
  styledButton: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "30px",
  }
};

export default Loan;
