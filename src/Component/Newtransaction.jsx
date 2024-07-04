import React, { useState } from 'react';

const NewTransaction = ({ setTransactions }) => {
  
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [currentId, setCurrentId] = useState(4); 
  const [mode, setMode] = useState('cash');

  const addTransaction = () => {

    const now = new Date();

    const transaction = {
      id: currentId + 1,
      text: text,
      amount: type === 'expense' ? -Math.abs(+amount) : Math.abs(+amount),
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString(),
      mode: mode
    };
    setTransactions(prevState => [transaction, ...prevState]);
    setCurrentId(prevId => prevId + 1); 

    setAmount("");
    setText("");
  }

  return (
    <div style={styles.container}>
      <h5 style={{margin:"0 0 20px 100px",fontSize:"25px"}}>New Transaction</h5>
    
  <div>
  <label>Description:</label>
      <input 
        type="text" 
        style={styles.inputt}
        placeholder="Enter Description" 
        value={text}
        onChange={(e) => setText(e.target.value)} 
      />

      <label>Amount:</label>
      <input 
        type="number" 
        style={styles.inputt}
        placeholder="Enter Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)} 
      />
      
  </div>


      <div style={styles.container2}>
      <label style={{fontWeight:"Bold",fontSize:"20px",paddingRight:"10px"}}>Type:</label>
        <div>
          <input 
            type="radio" 
            id="expense" 
            name="type" 
            value="expense" 
            checked={type === 'expense'} 
            onChange={(e) => setType(e.target.value)} 
          />
          <label htmlFor="expense" style={{fontSize:"18px",color:"red",fontWeight:"bold"}}>Expense</label>
        </div>

        <div>
          <input 
            type="radio" 
            id="income" 
            name="type" 
            value="income" 
            checked={type === 'income'} 
            onChange={(e) => setType(e.target.value)} 
          />
          <label htmlFor="income" style={{fontSize:"16px",color:"green",fontWeight:"bold"}}>Income</label>
        </div>
      </div>
      
      <div style={styles.container2}>
      
        <label style={{fontWeight:"Bold",fontSize:"16px",paddingRight:"10px"}}>Mode:</label>
        <div>
          <input 
            type="radio" 
            id="cash" 
            name="mode" 
            value="cash" 
            checked={mode === 'cash'} 
            onChange={(e) => setMode(e.target.value)} 
          />
          <label htmlFor="cash" style={{fontSize:"16px",fontWeight:"bold"}}>Cash</label>
        </div>

        <div>
          <input 
            type="radio" 
            id="upi" 
            name="mode" 
            value="upi" 
            checked={mode === 'upi'} 
            onChange={(e) => setMode(e.target.value)} 
          />
          <label htmlFor="upi" style={{fontSize:"16px",fontWeight:"bold"}}>UPI</label>
        </div>

        <div>
          <input 
            type="radio" 
            id="BankTransfer" 
            name="mode" 
            value="BankTransfer" 
            checked={mode === 'BankTransfer'} 
            onChange={(e) => setMode(e.target.value)} 
          />
          <label htmlFor="BankTransfer" style={{fontSize:"16px",fontWeight:"bold"}}>Bank Transfer</label>
        </div>

      </div>



      <button style={styles.styledButton} onClick={addTransaction}>
        Add Transaction
      </button>
    </div>
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
  inputt:{
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
    background: "#445A6F",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "30px",
  },
  container2:{
    display:"flex",
    justifyContent: "center",
    border: "1px solid #ccc",
    padding:"10px",
    gap:"40px",
    borderRadius:"8px",
    marginTop:"10px",
  },
   maincontainer:{
    border: "1px solid #ccc",
    borderRadius: "8px",
   }
};

export default NewTransaction;
