import React, { useState,useEffect  } from "react";
import NewTransaction from "./Newtransaction";
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTotal } from "../redux/store"; 

const ExpenseCard = ({ transactions, setTransactions }) => {
    

    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts.filter(item => item > 0).reduce((accumulator, item) => (accumulator + item), 0);
    const expense = amounts.filter(item => item < 0).reduce((accumulator, item) => (accumulator + item), 0);


    const dispatch = useDispatch();

  useEffect(() => {
    const amounts = transactions.map(transaction => transaction.amount);
    const newTotal = amounts.reduce((sum, item) => (sum += item), 0);
    dispatch(setTotal(newTotal));
  }, [transactions, dispatch]);


    return (
        <>
            <style>
                {`
                    .tooltip {
                        position: relative;
                        display: inline-block;
                    }
                    .tooltipText {
                        visibility: hidden;
                        width: 160px;
                        background-color: #555;
                        color: #fff;
                        text-align: center;
                        border-radius: 6px;
                        padding: 5px 0;
                        position: absolute;
                        z-index: 1;
                        bottom: 125%;
                        left: 50%;
                        margin-left: -80px;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }
                    .tooltip:hover .tooltipText {
                        visibility: visible;
                        opacity: 1;
                    }
                `}
            </style>
           
            <div style={{display:"flex",marginLeft:"40%"}}>
            <h1 style={{fontFamily:"cursive"}}><u>Cash Flow Manager</u></h1>
            <div style={{marginLeft:"100px"}}>
            <h3><Link to='/profile' style={{textDecoration:"none"}}>
            <img src="profile.jpg" style={styles.image} alt="profile" /><p>profile</p></Link></h3>
            </div>
           
            </div>
            
            <div style={styles.card}>
                <h3 style={styles.balanceHeading}>Balance: ${income + expense}</h3>
                <div style={styles.valuesContainer}>
                    <div style={styles.value}>
                        <p>Total Income:</p>
                        <span style={styles.income}>${income}</span>
                    </div>
                    <div style={styles.separator}></div>
                    <div style={styles.value}>
                        <p>Total Expenses:</p>
                        <span style={styles.expense}>${expense}</span>
                    </div>
                </div>
            </div>

            <div style={styles.buttonContainer}>
                <button onClick={resetTransactions} style={styles.addButton} className="tooltip">
                    Reset
                    <span className="tooltipText">Clears income, expense, and history</span>
                </button>
                <button style={styles.addButton} onClick={clickonadd} className="tooltip">
                    {isAddVisible ? "CANCEL" : "ADD Transaction"}
                    <span className="tooltipText">{isAddVisible ? "Hide transaction card" : "Add New Transaction"}</span>
                </button>
            </div>
            {isAddVisible && <NewTransaction setTransactions={setTransactions} />}
        </>
    );
};

const styles = {
    card: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px",
        textAlign: "center",
        maxWidth: "400px",
        margin: "-20px auto",
    },
    balanceHeading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    valuesContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    value: {
        flex: "1",
        textAlign: "center",
    },
    income: {
        color: "green",
        fontWeight: "bold",
        fontSize: "20px",
    },
    expense: {
        color: "red",
        fontWeight: "bold",
        fontSize: "20px",
    },
    separator: {
        borderLeft: "1px solid #ddd",
        height: "40px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        margin: "30px",
    },
    addButton: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        position: "relative",
    },
    image:{
        borderRadius:"50%",
        width:"60px",
        height:"60px"
    }
};

export default ExpenseCard;
