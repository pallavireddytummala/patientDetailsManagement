import { useEffect, useState } from 'react'
import Web3 from 'web3';
import '../App.css'
import Cont from '../../../../build/contracts/doctorPage.json'

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