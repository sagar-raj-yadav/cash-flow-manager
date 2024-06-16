import { Link } from 'react-router-dom';
import  { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setTotal } from "../redux/store"; 


const Balance = ({ transactions }) => {
  
  const dispatch = useDispatch();
  const total = useSelector(state => state.balance.total);

  
  useEffect(() => {
    const amounts = transactions.map(transaction => transaction.amount);
    const newTotal = amounts.reduce((sum, item) => (sum += item), 0);
    dispatch(setTotal(newTotal)); // Dispatch action to update total balance
  }, [transactions, dispatch]);

  return (
    <>
      <div style={styles.container}>
      
        <div style={styles.profile}>
          <img src="image2.jpg" style={styles.image2} alt="Profile" />
          <h3 style={styles.profileLink}>
            <Link to='/profile'>Profile</Link>
          </h3>
        </div>

        <div style={styles.balance}>
          <h3 style={styles.heading3}>Remaining Balance: ${total}</h3>
          
          {total < 0 && (
            <p style={styles.warning}>You do not have enough money to spend. Consider taking a loan.</p>
          )}
       </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "20px"
  },
  balance: {
    backgroundColor: '#f0f0f0',
    marginBottom: "20px",
    padding: "10px",
    borderRadius: '10px',
    textAlign: 'center',
    margin: "10px"
  },
  heading3: {
    textAlign: 'center',
    fontSize: '25px',
    color: 'black',
    fontWeight: 'bold',
  },
  warning: {
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px"
  },
  profileLink: {
    cursor: "pointer",
    fontSize: "25px",
  },
  image2: {
    borderRadius: '50%',
    height: '80px',
    width: '80px',
  }
};

export default Balance;
