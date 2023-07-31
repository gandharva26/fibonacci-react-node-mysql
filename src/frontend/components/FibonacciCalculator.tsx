

import { useNavigate,  } from 'react-router-dom';

import  { useState } from 'react'

import { useEffect } from 'react';
const FibonacciCalculator = () => {


  const [inputValue, setInputValue] = useState('');

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate()
 

  
useEffect(()=> {

  if(submit == true){
    if(Number(inputValue) <= 0){
      alert('enter a positive number')
      setSubmit(false)
    }

    else
    navigate('/results', { state: { data: Number(inputValue)} });
    
  }
 


}, [submit])
 
  return (
    <div style={{display:"block"}}>
   <h4>Enter a Number </h4>
      <input type="number" style={{marginTop:"10px"}}
        value={inputValue}
        onChange={(event) => {
			event.preventDefault()
			setInputValue(event.target.value)
     
    }}
      />
      <div style={{marginTop:"20px"}}>

      <button onClick={(event) => {
      event.preventDefault()
      setSubmit(true)
      }
  }>Submit</button>
   

      </div>
   




    </div>
  );
};

export default FibonacciCalculator;
