// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CoronavirusDisease = await hre.ethers.getContractFactory("CoronavirusDisease");

  const name = "Coronavirus disease";
  const symbol = "cd";
  const uri = "ipfs://ipfs/Qmez8cpQbmDNr3taEsG5CVQA2RwEanWc5hgyPDvQDZBQbh";
  const coronavirusDisease = await CoronavirusDisease.deploy(name,symbol,uri);

  await coronavirusDisease.deployed();

  console.log("coronavirusDisease deployed to:", coronavirusDisease.address);


  const CoronavirusDiseaseVaccine = await hre.ethers.getContractFactory("CoronavirusDiseaseVaccine");

  const name = "Coronavirus disease vaccine";
  const symbol = "cdv";
  const uri = "ipfs://ipfs/Qmez8cpQbmDNr3taEsG5CVQA2RwEanWc5hgyPDvQDZBQbh";
  const coronavirusDiseaseVaccine = await CoronavirusDiseaseVaccine.deploy(name,symbol,uri);

  await coronavirusDiseaseVaccine.deployed();

  console.log("coronavirusDiseaseVaccine deployed to:", coronavirusDiseaseVaccine.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
