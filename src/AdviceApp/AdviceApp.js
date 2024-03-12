import React, { useEffect, useState } from 'react';
import "./AdviceApp.css"

function AdviceApp() {

const[advice,setAdvice]=useState("Please Click Button to get Advice")
const[count,setCount]=useState(0);

  async function getAdvice(){
    const res=await fetch("https://api.adviceslip.com/advice");
    const data=await res.json();
    setAdvice(data.slip.advice)
    setCount(count+1)
  }

  useEffect(function(){
    getAdvice();
  },[])

  return (
    <div>
        <h3>{advice}</h3>
        <button onClick={getAdvice}>Get Advice</button>
        <p>You have read <b>{count}</b>{count<=1 ? " piece" : " pieces"} of advice</p>
    </div>
  )
}

export default AdviceApp