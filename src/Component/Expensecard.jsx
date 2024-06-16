import React, { useState } from "react";
import NewTransaction from "./Newtransaction";
import Loan from './Loan';

const ExpenseCard = ({ transactions ,setTransactions,loan}) => {
    const [isAddVisible, setIsAddVisible] = useState(true);
    const [isLoanVisible, setIsLoanVisible] = useState(false);

    const clickonadd = () => {
        setIsAddVisible(!isAddVisible);
    };

    const toggleLoan = () => {
        setIsLoanVisible(!isLoanVisible);
      };

      
    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts.filter(item => item > 0).reduce((accumulator, item) => (accumulator + item), 0);
    const expense = amounts.filter(item => item < 0).reduce((accumulator, item) => (accumulator + item), 0);


    return (
        <>
            <div style={styles.container3}>
                <div style={styles.expenses}>
                    <p>EXPENSE:</p>
                    <span style={styles.spann2}>${expense}</span>
                </div>
                <div style={styles.incomes}>
                    <p>INCOME:</p>
                    <span style={styles.spann}>${income}</span>
                </div>
            </div>
            <button style={styles.addButton} onClick={clickonadd}>
                    {isAddVisible ? "CANCEL" : "ADD Transaction"}
                </button>
            {isAddVisible && <NewTransaction setTransactions={setTransactions} />}
        

        <button style={styles.loanButton} onClick={toggleLoan}>
        {isLoanVisible ? "HIDE LOAN" : "TAKE LOAN"}
        </button>
      {isLoanVisible && <Loan setTransactions={setTransactions} />}
        
    </>
    );
};

const styles={
    
 container3:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap:"150px",
    fontSize: "20px"
   },
   expenses:{
    border:"2px solid red",
    padding:"8px",
    fontSize:"15px",
    backgroundColor: "rgba(221, 217, 217, 0.2)",
    borderRadius: "3px"
   },
   spann2:{
    fontSize:"25px",
    fontWeight: "bold",
    color:"red"
  },
  incomes:{
    border:"2px solid green",
    padding:"8px",
    fontSize:"15px",
    backgroundColor: "rgba(221, 217, 217, 0.2)",
    borderRadius: "3px"
   },
   loans:{
    border:"2px solid green",
    padding:"8px",
    fontSize:"15px",
    backgroundColor: "rgba(221, 217, 217, 0.2)",
    borderRadius: "3px"
   },
   spann:{
    fontSize:"25px",
    fontWeight:"bold",
    color:"green",
  },
 
  addButton: {
    display: "block",
    margin:"10px 0 10px  47%",
    padding: "8px",
    backgroundColor:" #007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  loanButton: {
    display: "block",
    margin: "10px 0 10px 25%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};


export default ExpenseCard;