// SPDX-License-Identifier: MIT
pragma solidity >0.4.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract patientPage{
    address public admin;

    constructor(){
        admin = msg.sender;
    }

    function getAdmin() view public returns(address){
        return admin;
    }
    
    

}