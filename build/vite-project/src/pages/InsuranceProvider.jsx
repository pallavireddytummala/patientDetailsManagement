import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'

function InsuranceProvider(){
const [patientId, setPatientId] = useState('');
const [insuranceId, setInsuranceId] = useState('');
const [medicalState, setMedicalState] = useState('');
const [latestDate, setLatestDate] = useState('');
const [patientName, setPatientName] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [showInsuranceLogin, setInsuranceLogin] = useState(true);
const [showInsuranceButtons, setInsuranceButtons] = useState(false);
const [showPatientMedicalStateGet, setPatientMedicatStateGet] = useState(false);
const [showPatientDetailsGet, setPatientDetailsGet] = useState(false);

  return (
    <div id='Page'>
    <div id="Login" style={{display: showInsuranceLogin ? 'block' : 'none'}}>
      <center>
        <label htmlFor="pID">Insurance Id</label>
        <input type="text" placeholder='Insurance Id ex:0x123456789abccdefghijklmnopqrstuvwxyz' id='pID' 
        value={insuranceId} onChange={(e)=>{setInsuranceId(e.target.value)}} required/>
        <br />
        <button onClick={()=>{
        if(insuranceId == '')
          alert('Please enter valid patient ID');
        else{setInsuranceLogin(false);setInsuranceButtons(true);}
        }}>submit</button>
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
    <div id="InsuranceButtons" style={{display: showInsuranceButtons ? 'block' : 'none'}}>
      <center style={{marginTop: '10rem'}}>
        <button onClick={()=>{setPatientDetailsGet(true);setInsuranceButtons(false)}}>Get Patient Details</button>
        <button onClick={()=>{setPatientMedicatStateGet(true);setInsuranceButtons(false)}}>GET Patient Medical state</button>
      </center>
    </div>
    </div>
  )
  
}

export default InsuranceProvider
