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

    modifier isPatient(address patient){
        require(bytes(patientDetails[patient][0].name).length != 0, "No patient details found");
        _;
    }

    modifier isInsuranceProvider(address insId){
        require(insuranceProviders[insId] != address(0), "No insurance provider found");
        _;
    }

    mapping (address => doctorAddedMedicalState[]) public patientMedicalState;
    mapping (address => doctorPrescription[]) public patientPrescription;
    mapping(address => details[]) public patientDetails;
    mapping(address => address) public insuranceProviders;
    
    function setPatientMedicalState(address _pat, string memory _medicalState, address docID, string memory _date) public isDoctor(docID){
        patientMedicalState[_pat].push(doctorAddedMedicalState({
            medicalState: _medicalState,
            time : block.timestamp,
            doctorId: docID,
            dateAdded: _date
        }));
    }

    function setDoctorPrescription(address pat, string memory _medicine, address _doctorId, string memory _advice) public isDoctor(_doctorId){
        patientPrescription[pat].push(doctorPrescription({
            medicine: _medicine,
            doctorId: _doctorId,
            advice: _advice,
            time: block.timestamp
        }));
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

    function getPatientMedicalState(address pat) view public isPatient(pat) returns(doctorAddedMedicalState[] memory){
        return patientMedicalState[pat];
    }

    function getPatientPrescription(address pat) view public isPatient(pat) returns(doctorPrescription[] memory){
        return patientPrescription[pat];
    }

    function getPatientDetails(address _pat) view public isPatient(_pat) returns(details[] memory){
        return patientDetails[_pat];
    }
    
    function validatePatient(address _pat) view public isPatient(_pat) returns(bool){
        return true;
    }

    function validateDoctor(address doc) view public isDoctor(doc) returns(bool) {
        return true;
    }

    function validateInsuranceProvider(address ins) view public isInsuranceProvider(ins) returns(bool){
        return true;
    }

}