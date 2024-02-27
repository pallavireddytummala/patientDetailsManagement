import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'

function Patient(){
const [patientId, setPatientId] = useState('');
const [insuranceId, setInsuranceId] = useState('');
const [medicalState, setMedicalState] = useState('');
const [latestDate, setLatestDate] = useState('');
const [patientName, setPatientName] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [prescription, setPrescription] = useState('');
const [showPatientLogin, setPatientLogin] = useState(true);
const [showPatientButtons, setPatientButtons] = useState(false);
const [showPatientMedicalStateGet, setPatientMedicatStateGet] = useState(false);
const [showPatientPrescripitonGet, setPatientPrescripitonGet] = useState(false);
const [showPatientDetailsGet, setPatientDetailsGet] = useState(false);
  return (
    <div id='Page'>        
    <div id="Login" style={{display: showPatientLogin ? 'block' : 'none'}}>
      <center>
          <label htmlFor="pID">Patient Id</label>
          <input type="text" placeholder='Patient ID ex:0x123456789abccdefghijklmnopqrstuvwxyz' id='pID' 
          value={patientId} onChange={(e)=>{setPatientId(e.target.value)}} required/>
          <br />
          <button onClick={()=>{
          if(patientId == '')
            alert('Please enter valid patient ID');
          else if(/^0x[0-9A-Fa-f]{40}$/.test(patientId)){
            setPatientLogin(false);setPatientButtons(true);
          }
          else
            alert('Please enter patient ID in the valid format');
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
    <div id="getPatientPrescription" style={{display : showPatientPrescripitonGet ? 'block' : 'none'}}>
      <center>
        <h1>Patient Medical Prescription</h1>
        <div id="viewer" className='Holder'>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="prescription">Medical State</label><p id='prescription'>{prescription}</p>
          <label htmlFor="lastModified">Latest modified date</label><p>{latestDate}</p>
        </div>
      </center>
    </div>
    <div id="patientButtons" style={{display: showPatientButtons ? 'block' : 'none'}}>
      <center style={{marginTop: '10rem'}}>
        <button onClick={()=>{setPatientDetailsGet(true);setPatientButtons(false)}}>Get Patient Details</button>
        <button onClick={()=>{setPatientMedicatStateGet(true);setPatientButtons(false)}}>GET Patient Medical state</button>
        <button onClick={()=>{setPatientPrescripitonGet(true);setPatientButtons(false)}}>GET Patient Pescription</button>
      </center>
    </div>    
    </div>
  )
}

export default Patient
