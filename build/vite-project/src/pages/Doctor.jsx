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

const connectWallet = async ()=>{
  if(window.ethereum){
    setMsg('metamask detected');
    console.log(msg);
    await window.ethereum.request({method:"eth_requestAccounts"})
    const web3 = new Web3(window.ethereum);
    //saving web3 instance in a state variable to access globally
    setweb3(web3);
    const acc = await web3.eth.getAccounts();
    console.log(acc);
    setacc(acc[0])
    const contract = new web3.eth.Contract(Cont.abi,'0x9BA207D9515AE02084712322f162acD6F3d8Ecd9');
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

function validateForm() {
    getAdmin();
    const patientID =document.getElementById('patientID').value;
    const doctorID =document.getElementById('doctorID').value;
    /*const fileName =document.getElementById('fileName').value;
    const fileType =document.getElementById('fileType').value;
    const fileID =document.getElementById('fileID').value;
    const date = document.getElementById('date').value;*/
    
    if((doctorID) !== admin){
      window.alert('Enter the valid Doctor id');
      return false;
    } 
    /*if(!isPatient(patientID)){
      let addingPatient = window.confirm('Adding a patient');
      if(!addingPatient){
        window.alert('Enter the valid Patient id')
        return false;
      }
      addPatient(patientID);
    }    */
    return true;
  }

  return (
    <>
        <center>
        <p>{admin}</p>
        <h1>Welcome Doctor...</h1>
        <form onSubmit={validateForm}>
          <div className="inputHolder">
            <label htmlFor="doctorID">Doctor Id</label><input type="text" placeholder='address' id='doctorID' required/>
            <label htmlFor="patientID">Patient Id</label><input type="text" placeholder='address' id='patientID' required/>
            <label htmlFor="fileName">File name</label><input type="text" placeholder='string' id='fileName' required/>
            <label htmlFor="fileType">File type</label><input type="text" placeholder='string' id='fileType' required/>
            <label htmlFor="fileID">File id</label><input type="text" placeholder='string' id='fileID' required/>    
            <label htmlFor="date">Date</label><input type="date" placeholder='date' id='date' required/>
            <label htmlFor="file">Add the file</label><input type="file" placeholder='file' id='file' required/>
          </div>
          <input type="submit" />
        </form>
      </center>
    </>
  )
}

export default Doctor
