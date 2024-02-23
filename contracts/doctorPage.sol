// SPDX-License-Identifier: MIT
pragma solidity >0.4.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract doctorPage{
    address admin;
    constructor(){
        admin = msg.sender;
    }

    function getAdmin() view public returns (address){
        return admin;
    }

    struct doctorAddedMedicalState{
        string medicalState;
        address doctorId;
        string dateAdded;
        uint256 time;
    }

    struct doctorPrescription{
        string medicine;
        address doctorId;
        string advice;
        uint256 time;
    }

    struct details{
        string name;
        uint age;
        string gender;
        address insuranceProviderId;
        address doctorId;
        uint time;
    }

    modifier isDoctor(address doctor){
        require(msg.sender == doctor, "Only registered doctors are allowed to modify data");
        _;
    }

    mapping (address => doctorAddedMedicalState[]) patientMedicalState;
    mapping (address => doctorPrescription[]) patientPrescription;
    mapping(address => details[]) patientDetails;
    
    function addPatientMedicalState(address _pat, string memory _medicalState, address docID, string memory _date) public isDoctor(docID){
        patientMedicalState[_pat].push(doctorAddedMedicalState({
            medicalState: _medicalState,
            time : block.timestamp,
            doctorId: docID,
            dateAdded: _date
        }));
    }

    function getDoctorAddedMedicalState(address pat) view public returns (doctorAddedMedicalState[] memory){
        return patientMedicalState[pat];
    }

    function addDoctorPrescription(address pat, string memory _medicine, address _doctorId, string memory _advice) public isDoctor(_doctorId){
        patientPrescription[pat].push(doctorPrescription({
            medicine: _medicine,
            doctorId: _doctorId,
            advice: _advice,
            time: block.timestamp
        }));
    }

    function getPatientPrescription(address pat) view public returns(doctorPrescription[] memory){
        return patientPrescription[pat];
    }
    
    function setPatientDetails(address _patIID, string memory _name, string memory _gender, uint256 _age, address _insId, address _docId) public{
        patientDetails[_patIID].push(details({
            name: _name,
            age: _age,
            gender: _gender,
            insuranceProviderId: _insId,
            doctorId: _docId,
            time: block.timestamp
        }));
    }
    
}