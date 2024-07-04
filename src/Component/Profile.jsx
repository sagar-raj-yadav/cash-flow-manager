
import { useSelector } from 'react-redux';
import {useState} from'react';

const Profile = () => {
  const total = useSelector(state => state.balance.total);
  const [isVisible, setIsVisible] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      const response = await fetch('https://formspree.io/f/mdoqqlrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        }) 
      }else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };


    return (
      <>
        <div style={{textAlign:"center"}}>
        <img src="profile.jpg" style={styles.image2} />
        <h3 style={{cursor:"pointer",fontSize:"25px"}}>Sagar Raj Yadav</h3>
        <h2><u>Remaining Balance</u>: ${total}</h2>
        </div>

        <div style={styles.container}>
      <div style={styles.box}>
        <p style={styles.info}><strong>Name:</strong> Sagar Raj Yadav</p>
        <hr style={styles.hr} />
        <p style={styles.info}><strong>Phone No.:</strong> 9876543210</p>
        <hr style={styles.hr} />
        <p style={styles.info}><strong>Email:</strong> Sagarrajyadav2002@gmail.com</p>
        <hr style={styles.hr} />
        <p style={styles.info}>
          <strong>Balance:</strong> 
          <button style={styles.button} onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? "Check Balance" : `$${total}`}
          </button>
        </p>
        <hr style={styles.hr} />
        <p style={styles.info}><strong>Address:</strong> Village Padirma, Barhi(825405), Hazaribagh, Jharkhand, (India)</p>
      </div>
    </div>


  <h2 style={styles.allh2}><u>Feedback Form</u></h2>

  <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message:</label>
          <textarea
            style={{ ...styles.input, height: '150px' }}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>


      </>
    )
  }

  const styles={
    image2:{
      borderRadius:"50%",
      height:"80px",
      width:"80px"
    },
    form: {
    maxWidth: '500px',
    margin: '2px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#333',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  allh2: {
    textAlign:"center",
    marginTop:"50px"
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  
     container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"50px",
    
  },
  box: {
    borderRadius: "10px",
    width: "500px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  info: {
    fontSize: "18px",
    margin: "15px 0",
  },
  hr: {
    border: "none",
    borderBottom: "1px solid #ddd",
    margin: "10px 0"
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  },
 
      
};
export default Profile;
