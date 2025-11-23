const MySimpleContract = artifacts.require("MySimpleContract");

module.exports = function (deployer) {
  deployer.deploy(MySimpleContract);
};
