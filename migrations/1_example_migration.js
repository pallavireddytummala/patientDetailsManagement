let myContract = artifacts.require("sample")

module.exports = function(deployer){
    deployer.deploy(myContract);
}
