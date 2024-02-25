import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id='home'>
      <center>
          <h1>Who are you ?</h1>
          <button onClick={()=>{navigate('./doctor')}}>Doctor</button>
          <button onClick={()=>{navigate('./patient')}}>Patient</button>
          <button onClick={()=>{navigate('./insuranceProvider')}}>Insurance provider</button>
      </center>
    </div>
  )
}

export default Home
