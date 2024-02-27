import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'
import Cont from '../../../../build/contracts/doctorPage.json'

function Patient(){
const [msg, setMsg] = useState('')
const [web3, setweb3] = useState('')
const [contrr, setcontrr] = useState('')
const [acc, setacc] = useState('')
const [patientId, setPatientId] = useState('');
const [insuranceId, setInsuranceId] = useState('');
const [medicalState, setMedicalState] = useState('');
const [latestDate, setLatestDate] = useState('');
const [patientName, setPatientName] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [prescription, setPrescription] = useState('');
const [docAdvice, setDocAdvice] = useState('');
const [showPatientLogin, setPatientLogin] = useState(true);
const [showPatientButtons, setPatientButtons] = useState(false);
const [showPatientMedicalStateGet, setPatientMedicatStateGet] = useState(false);
const [showPatientPrescripitonGet, setPatientPrescripitonGet] = useState(false);
const [showPatientDetailsGet, setPatientDetailsGet] = useState(false);

const connectWallet = async ()=>{
  if(window.ethereum){
    setMsg('metamask detected');
    console.log(msg);
    await window.ethereum.request({method:"eth_requestAccounts"})
    const web3 = new Web3(window.ethereum);
    setweb3(web3);
    const acc = await web3.eth.getAccounts();
    console.log(acc);
    setacc(acc[0])
    const contract = new web3.eth.Contract(Cont.abi,'0x650047951102Fa6FD7BE59B05F2Dc8B8B7bC5830');
    console.log(contract)
    setcontrr(contract)
  }else{
    alert('metamask not detected please install')
  }
}

useEffect(()=>{
connectWallet()
},[]);

async function validatePatient(){
  const flag = await contrr.methods.validatePatient(patientId).call();
  if(flag){
    setPatientLogin(false);
    setPatientButtons(true);
  }
  else
    alert('Please enter valid patient id');
}

async function getPatientDetails(){  
  setPatientDetailsGet(true);
  setPatientButtons(false); 
  const data = await contrr.methods.getPatientDetails(patientId).call();
  console.log(data);
  setPatientName(String(data[0][0]));
  setAge(String(data[0][1]));
  setGender(String(data[0][2]));
  setInsuranceId(String(data[0][3]));
}

async function getPatientPrescription(){
  setPatientPrescripitonGet(true);
  setPatientButtons(false)
  const data = await contrr.methods.getPatientPrescription(patientId).call();
  console.log(data);
  setPrescription(data[0][0]);
  setDocAdvice(data[0][2]);
}

async function getPatientMedicalState(){  
  setPatientMedicatStateGet(true);
  setPatientButtons(false)
  const data = await contrr.methods.getPatientMedicalState(patientId).call();
  setMedicalState(data[0][0]);
  setLatestDate(data[0][3]);
}

  return (
    <div id='Page'>        
    <div id="Login" style={{display: showPatientLogin ? 'block' : 'none'}}>
      <center>
          <label htmlFor="pID">Patient Id</label>
          <input type="text" placeholder='Patient ID ex:0x123456789abccdefghijklmnopqrstuvwxyz' id='pID' 
          value={patientId} onChange={(e)=>{setPatientId(e.target.value)}} required/>
          <br />
          <button onClick={validatePatient}>submit</button>
      </center>
    </div>
    <div className="getPatientMedicalState" style={{display: showPatientMedicalStateGet ? 'block' : 'none'}}>
      <center>
        <h1>Patient Medical state</h1>
        <div id="viewer" className='Holder'>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="medicalState">Medical State</label><p id='medicalState'>{medicalState}</p>
          <label htmlFor="lastModified">Latest modified date</label><p>{latestDate}</p>
        </div>
      </center>
    </div>
    <div id="getPatientDetails" style={{display: showPatientDetailsGet ? 'block' : 'none'}}>
      <center>        
        <h1>Patient Details</h1>
        <div className="Holder" id='viewer'>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="name">Name</label><p id='name'>{patientName}</p>
          <label htmlFor="age">Age</label><p id='age'>{age}</p>
          <label htmlFor="gender">Gender</label><p id='gender'>{gender}</p>
          <label htmlFor="insuranceId">Insurance Id</label><p id='insuranceId'>{insuranceId}</p>
        </div>
      </center>
    </div>
    <div id="getPatientPrescription" style={{display : showPatientPrescripitonGet ? 'block' : 'none'}}>
      <center>
        <h1>Patient Medical Prescription</h1>
        <div id="viewer" className='Holder'>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="prescription">Medical State</label><p id='prescription'>{prescription}</p>
          <label htmlFor="lastModified">Medical advice</label><p>{docAdvice}</p>
        </div>
      </center>
    </div>
    <div id="patientButtons" style={{display: showPatientButtons ? 'block' : 'none'}}>
      <center style={{marginTop: '10rem'}}>
        <button onClick={getPatientDetails}>Get Patient Details</button>
        <button onClick={getPatientMedicalState}>GET Patient Medical state</button>
        <button onClick={getPatientPrescription}>GET Patient Pescription</button>
      </center>
    </div>    
    </div>
  )
}

export default Patient
