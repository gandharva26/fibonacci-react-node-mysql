import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FibonacciResults = () => {
  const location = useLocation();
  const [fibonacciValue, setFibonacciValue] = useState('');
 
  useEffect(() => {
    const baseUrl = "http://localhost:3000/";

    const calculateFibonacci = async () => {
      
     
     
        const response = await axios.get(baseUrl + `fibonacci`, { params: { value: location.state['data'] || 0 } });
        setFibonacciValue(response.data.join(' ')); // Update state with the new value directly
     
      }
    calculateFibonacci();
 

  }, []);

  return (
    <div style={{ display: "block", marginTop: "2%" }}>
      <div>
        The Fibonacci Series is:
        <div style={{ display: "block", marginTop: "10px" }} >
          {fibonacciValue}
        </div>
      </div>
      <button style={{ display: "block", marginTop: "10px" }}>
        <Link to='/fibonacci'>
          Go back
        </Link>
      </button>
    </div>
  );
}
