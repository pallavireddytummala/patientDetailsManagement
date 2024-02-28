import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'
import Cont from '../../../../build/contracts/doctorPage.json'

function Doctor() {
const [msg, setMsg] = useState('')
const [web3, setweb3] = useState('')
const [contrr, setcontrr] = useState('')
const [acc, setacc] = useState('')
const [admin, setAdmin] = useState('')
const [docId, setDocId] = useState('');
const [patientId, setPatientId] = useState('');
const [medicalState, setMedicalState] = useState('');
const [docAdvice, setDocAdvice] = useState('');
const [insuranceId, setInsuranceId] = useState('');
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

async function getAdmin(){
  const temp = await contrr.methods.getAdmin().call();
  setAdmin(temp);
}

useEffect(() => {
  if (contrr !== '') {
    getAdmin();
  }
}, [contrr]);

function validateDocLogin() {  
  if((docId) !== admin){
    console.log(admin);
    return false;
  } 
  return true;
}

async function validatePatient(){
  const flag = await contrr.methods.validatePatient(patientId).call();
  console.log(flag);
  return flag;
}

async function addModifyPatientDetails(){
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)))
    alert('Please enter a valid patient id');
  else if(!(/^[a-zA-Z ]+$/.test(patientName)))
    alert('Please enter a valid patient name');
  else if(age < 0 || age > 120)
    alert('Please enter a valid age');
  else if(gender == '')
    alert('Please select one of the genders');
  else if(!(/^0x[0-9A-Fa-f]{40}$/.test(insuranceId)))
    alert('Please enter a valid insurance id');
  else{
    await contrr.methods.setPatientDetails(patientId, patientName, gender, age, insuranceId, docId).send({from : acc});
    alert('Patient details updated successfully');
  }
}

async function getPatientDetails(){  
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)) && validatePatient())
    alert('Please enter a valid patient id');
  else{
    const data = await contrr.methods.getPatientDetails(patientId).call();
    console.log(data);
    setPatientName(String(data[0][0]));
    setAge(String(data[0][1]));
    setGender(String(data[0][2]));
    setInsuranceId(String(data[0][3]));
  }
}

async function setPatientMedicalState(){
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)))
    alert('Please enter a valid patient id');
  else if(!(/^[a-zA-Z0-9\s]+$/.test(medicalState)))
    alert('Please enter a valid Medical state');
  else{
    setLatestDate((latestDate).split('-').reverse().join('-'));
    await contrr.methods.setPatientMedicalState(patientId, medicalState, docId, latestDate).send({from : acc});
    alert('Patient details added successfully');
  }
}

async function getPatientMedicalState(){  
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)) && validatePatient())
    alert('Please enter a valid patient id');
  else{
    const data = await contrr.methods.getPatientMedicalState(patientId).call();
    setMedicalState(data[0][0]);
    setLatestDate(data[0][3]);
  }
}

async function setPatientPrescription(){
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)))
    alert('Please enter a valid patient id');
  else if(!(/^[a-zA-Z0-9\s]+$/.test(prescription)))
    alert('Please enter a valid Prescription');
  else if(!(/^[a-zA-Z0-9\s]+$/.test(docAdvice)))
    alert('Please enter a valid Advice');
  else{
    setLatestDate((latestDate).split('-').reverse().join('-'));
    await contrr.methods.setDoctorPrescription(patientId, prescription, docId, docAdvice).send({from : acc});
    alert('Patient prescription added successfully');
  }
}

async function getPatientPrescription(){
  if(!(/^0x[0-9A-Fa-f]{40}$/.test(patientId)) && validatePatient())
    alert('Please enter a valid patient id');
  else{
    const data = await contrr.methods.getPatientPrescription(patientId).call();
    console.log(data);
    setPrescription(data[0][0]);
    setDocAdvice(data[0][2]);
  }
}

function scrollToTop(){
  window.scrollTo({top: 0, behavior: 'smooth'})
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
          if(/^0x[0-9A-Fa-f]{40}$/.test(docId) && validateDocLogin()){
            setDoctorLogin(false);setDoctorButtons(true);
          }
          else
            alert('Please enter valid docID');
          }}>submit</button>
      </center>
    </div>
    <div id='setPatientMedicalState' style={{display: showPatientMedicalStateSet ? 'block' : 'none'}}>
       <center>
        <h1>Adding Patient Medical State</h1>
        <div className="Holder" id='viewer'>
          <label htmlFor="patientID">Patient Id</label><input type="text" placeholder='address' id='patientID' required value={patientId} onChange={(e)=>{setPatientId(e.target.value)}}/>
          <label htmlFor="medicalState"  style={{marginTop: '3rem'}}>Patient <br/> Medical State</label><textarea placeholder="Enter your message" rows={4} cols={50} id='medicalState' required value={medicalState} onChange={(e)=>{setMedicalState(e.target.value)}}/>
          <label htmlFor="date" style={{marginTop: '2rem'}}>Date</label><input type="date" placeholder='date' id='date' required style={{marginTop: '2rem'}} value={latestDate} onChange={(e)=>{setLatestDate(e.target.value)}}/>
        </div>
        <button onClick={setPatientMedicalState}>Submit</button>
      </center>
    </div>
    <div id="setPatientDetails" style={{display: showPatientDetailsSet ? 'block' : 'none'}}>
      <center>        
        <h1>ADD / Modify Patient Details</h1>
        <div className="Holder" id='viewer'>
          <label htmlFor="patientID">Patient id</label><input type="text" id='patientID' placeholder='address'required value={patientId} onChange={(e)=>{setPatientId(e.target.value)}}/>
          <label htmlFor="name">Name</label><input type="text" id='name' placeholder='Name' required value={patientName} onChange={(e)=>{setPatientName(e.target.value)}}/>
          <label htmlFor="age">Age</label><input type="number" id='age' placeholder='age' required value={age} onChange={(e)=>{setAge(e.target.value)}}/>
          <label htmlFor="gender">Gender</label>
          <div><input type="radio" name="gender" value='male' id="male" required onChange={(e)=>{setGender(e.target.value)}}/><label htmlFor="male">Male</label>
          <input type="radio" name="gender" value='female' id="female" required onChange={(e)=>{setGender(e.target.value)}}/><label htmlFor="female">Female</label><br />
          <input type="radio" name="gender" value='other' id="other" required onChange={(e)=>{setGender(e.target.value)}}/><label htmlFor="other">Others</label></div>
          <label htmlFor="insuranceId">Insurance ID</label><input type="text" id='insuranceId' placeholder='Insurance ID(optional)' value={insuranceId} onChange={(e)=>{setInsuranceId(e.target.value)}}/>
        </div>
        <center><button onClick={addModifyPatientDetails}>Submit</button></center>
      </center>
    </div>
    <div id="setPatientPrescription" style={{display: showPatientPrescripitonSet ? 'block' : 'none'}}>
      <center>
        <h1>Adding Patient Prescripton</h1>
        <div className="Holder" id='viewer'>
          <label htmlFor="patientID">Patient Id</label><input type="text" placeholder='address' id='patientID' required value={patientId} onChange={(e)=>{setPatientId(e.target.value)}}/>
          <label htmlFor="prescription" style={{marginTop: '3rem'}}>Patient Prescription</label><textarea placeholder="Enter medical prescription" rows={4} cols={50} id='prescription' required value={prescription} onChange={(e)=>{setPrescription(e.target.value)}}/>
          <label htmlFor="docAdvice" style={{marginTop: '3rem'}}>Patient Advice</label><textarea placeholder="Enter medical advice (diet..)" rows={4} cols={50} id='docAdvice' required value={docAdvice} onChange={(e)=>{setDocAdvice(e.target.value)}}/>
          <label htmlFor="date" style={{marginTop: '2rem'}}>Date</label><input type="date" placeholder='date' id='date' required style={{marginTop: '2rem'}}/>
        </div>
        <button onClick={setPatientPrescription}>Submit</button>
      </center>
    </div>
    <div className="getPatientMedicalState" style={{display: showPatientMedicalStateGet ? 'block' : 'none'}}>
      <center>
        <h1>Patient Medical state</h1>
        <div id="viewer" className='Holder'>
          <label htmlFor="pId">Patient Id</label><input type="text" id='pId' value={patientId} placeholder='address' 
          onChange={(e)=>{setPatientId(e.target.value)}}required/>
          <div></div><button onClick={getPatientMedicalState}>submit</button>
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
          <div></div><button onClick={getPatientDetails}>submit</button>
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
          <div></div><button onClick={getPatientPrescription}>submit</button>
          <label htmlFor="pId">Patient Id</label><p id='pId'>{patientId}</p>
          <label htmlFor="prescription" style={{marginTop: '1rem'}}>Medical Prescription</label><p id='prescription'>{prescription}</p>
          <label htmlFor="lastModified" style={{marginTop: '1rem'}}>Medical advice</label><p>{docAdvice}</p>
        </div>
      </center>
    </div>
    <div id="doctorButtons" style={{display: showDoctorButtons ? 'block' : 'none'}}>
      <center id='buttons'>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(true);setPatientDetailsSet(false);setPatientMedicatStateGet(false);
        setPatientMedicatStateSet(false);setPatientPrescripitonGet(false);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>Get Patient Details</button></center>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(false);setPatientDetailsSet(true);setPatientMedicatStateGet(false);
        setPatientMedicatStateSet(false);setPatientPrescripitonGet(false);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>ADD / Modify Patient Details</button></center>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(false);setPatientDetailsSet(false);setPatientMedicatStateGet(true);
        setPatientMedicatStateSet(false);setPatientPrescripitonGet(false);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>GET Patient Medical state</button></center>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(false);setPatientDetailsSet(false);setPatientMedicatStateGet(false);
        setPatientMedicatStateSet(true);setPatientPrescripitonGet(false);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>ADD Patient Medical State</button></center>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(false);setPatientDetailsSet(false);setPatientMedicatStateGet(false);
        setPatientMedicatStateSet(false);setPatientPrescripitonGet(true);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>GET Patient Pescription</button></center>
        <center><button onClick={()=>{scrollToTop(); setPatientDetailsGet(false);setPatientDetailsSet(false);setPatientMedicatStateGet(false);
        setPatientMedicatStateSet(false);setPatientPrescripitonGet(true);setPatientPrescripitonSet(false)/*setDoctorButtons(false)*/}}>ADD Patient Pescription</button></center>
      </center>
    </div>    
    </div>
  )
}

export default Doctor