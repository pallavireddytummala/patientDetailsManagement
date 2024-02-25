import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'

function Doctor() {
const [docId, setDocId] = useState('');
const [patientId, setPatientId] = useState('');
const [insuranceId, setInsuranceId] = useState('');
const [medicalState, setMedicalState] = useState('');
const [latestDate, setLatestDate] = useState('');
const [patientName, setPatientName] = useState('');
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [prescription, setPrescription] = useState('');
const [showDoctorLogin, setDoctorLogin] = useState(true);
const [showDoctorButtons, setDoctorButtons] = useState(false);
const [showPatientMedicalStateSet, setPatientMedicatStateSet] = useState(false);
const [showPatientPrescripitonSet, setPatientPrescripitonSet] = useState(false);
const [showPatientDetailsSet, setPatientDetailsSet] = useState(false);
const [showPatientMedicalStateGet, setPatientMedicatStateGet] = useState(false);
const [showPatientPrescripitonGet, setPatientPrescripitonGet] = useState(false);
const [showPatientDetailsGet, setPatientDetailsGet] = useState(false);


function validateForm() {  
    if((doctorID) !== admin){
      window.alert('Enter the valid Doctor id');
      console.log(admin);
    } 
    /*if(!isPatient(patientID)){
      let addingPatient = window.confirm('Adding a patient');
      if(!addingPatient){
        window.alert('Enter the valid Patient id')
        return false;
      }
      addPatient(patientID);
    }    */
  }

  return (
    <div id='Page'>
    <div id="Login" style={{display: showDoctorLogin ? 'block' : 'none'}}>
      <center>
          <label htmlFor="docID">Doctor Id</label>
          <input type="text" placeholder='Doctor ID ex:0x123456789abccdefghijklmnopqrstuvwxyz' id='docID' 
          value={docId} onChange={(e)=>{setDocId(e.target.value)}} required/>
          <br />
          <button onClick={()=>{
          if(docId == '')
            alert('Please enter valid docID');
          else{setDoctorLogin(false);setDoctorButtons(true);}
          }}>submit</button>
      </center>
    </div>
    <div id='setPatientMedicalState' style={{display: showPatientMedicalStateSet ? 'block' : 'none'}}>
       <center>
        <h1>Adding Patient Medical State</h1>
        <form >
          <div className="Holder">
            <label htmlFor="patientID">Patient Id</label><input type="text" placeholder='address' id='patientID' required/>
            <label htmlFor="medicalState"  style={{marginTop: '3rem'}}>Patient <br/> Medical State</label><textarea placeholder="Enter your message" rows={4} cols={50} id='medicalState' required/>
            <label htmlFor="date" style={{marginTop: '2rem'}}>Date</label><input type="date" placeholder='date' id='date' required style={{marginTop: '2rem'}}/>
          </div>
          <input type="submit" />
        </form>
      </center>
    </div>
    <div id="setPatientDetails" style={{display: showPatientDetailsSet ? 'block' : 'none'}}>
      <center>        
        <h1>ADD / Modify Patient Details</h1>
        <form >
          <div className="Holder">
            <label htmlFor="patientID">Patient id</label><input type="text" id='patientID' placeholder='address'required/>
            <label htmlFor="name">Name</label><input type="text" id='name' placeholder='Name' required/>
            <label htmlFor="age">Age</label><input type="number" id='age' placeholder='age' required/>
            <label htmlFor="gender">Gender</label>
            <div><input type="radio" name="gender" value='male' id="male" required/><label htmlFor="male">Male</label>
            <input type="radio" name="gender" value='female' id="female" required/><label htmlFor="female">Female</label><br />
            <input type="radio" name="gender" value='other' id="other" required/><label htmlFor="other">Others</label></div>
            <label htmlFor="insuranceId">Insurance ID</label><input type="text" id='insuranceId' placeholder='Insurance ID(optional)'/>
          </div>
          <center><input type="submit"/></center>
        </form>
      </center>
    </div>
    <div id="setPatientPrescription" style={{display: showPatientPrescripitonSet ? 'block' : 'none'}}>
      <center>
        <h1>Adding Patient Prescripton</h1>
        <form >
          <div className="Holder">
            <label htmlFor="patientID">Patient Id</label><input type="text" placeholder='address' id='patientID' required/>
            <label htmlFor="medicalState"  style={{marginTop: '3rem'}}>Patient Prescriptoin</label><textarea placeholder="Enter your message" rows={4} cols={50} id='medicalState' required/>
            <label htmlFor="date" style={{marginTop: '2rem'}}>Date</label><input type="date" placeholder='date' id='date' required style={{marginTop: '2rem'}}/>
          </div>
          <input type="submit" />
        </form>
      </center>
    </div>
    <div className="getPatientMedicalState" style={{display: showPatientMedicalStateGet ? 'block' : 'none'}}>
      <center>
        <h1>Patient Medical state</h1>
        <div id="viewer" className='Holder'>
          <label htmlFor="pId">Patient Id</label><input type="text" id='pId' value={patientId} placeholder='address' 
          onChange={(e)=>{setPatientId(e.target.value)}}required/>
          <div></div><button>submit</button>
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
          <label htmlFor="pId">Patient Id</label><input type="text" id='pId' value={patientId} placeholder='address' 
          onChange={(e)=>{setPatientId(e.target.value)}}required/>
          <div></div><button>submit</button>
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
          <label htmlFor="pId">Patient Id</label><input type="text" id='pId' value={patientId} placeholder='address' 
          onChange={(e)=>{setPatientId(e.target.value)}}required/>
          <div></div><button>submit</button>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="prescription">Medical State</label><p id='prescription'>{prescription}</p>
          <label htmlFor="lastModified">Latest modified date</label><p>{latestDate}</p>
        </div>
      </center>
    </div>
    <div id="doctorButtons" style={{display: showDoctorButtons ? 'block' : 'none'}}>
      <center id='buttons'>
        <center><button onClick={()=>{setPatientDetailsGet(true);setDoctorButtons(false)}}>Get Patient Details</button></center>
        <center><button onClick={()=>{setPatientDetailsSet(true);setDoctorButtons(false)}}>ADD / Modify Patient Details</button></center>
        <center><button onClick={()=>{setPatientMedicatStateGet(true);setDoctorButtons(false)}}>GET Patient Medical state</button></center>
        <center><button onClick={()=>{setPatientMedicatStateSet(true);setDoctorButtons(false)}}>ADD Patient Medical State</button></center>
        <center><button onClick={()=>{setPatientPrescripitonGet(true);setDoctorButtons(false)}}>GET Patient Pescription</button></center>
        <center><button onClick={()=>{setPatientPrescripitonSet(true);setDoctorButtons(false)}}>ADD Patient Pescription</button></center>
      </center>
    </div>    
    </div>
  )
}

export default Doctor
