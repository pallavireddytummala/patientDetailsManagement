let myContract = artifacts.require("doctorPage")

module.exports = function(deployer){
    deployer.deploy(myContract);
}
