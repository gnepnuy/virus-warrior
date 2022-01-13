import chai, { expect } from 'chai';
import { ethers } from 'hardhat';
import { solidity } from 'ethereum-waffle';
import { Contract, ContractFactory, BigNumber, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import keccak256 from 'keccak256';
import {MerkleTree} from 'merkletreejs';
import exp from 'constants';

chai.use(solidity);

describe("coronavirusDisease",() => {

  const ether = 100000000000000000;
  const ethAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

  const wthitelist = ['0xf71A370D35F70E4467A90BC696D48e357bA91A46','0xe63865c622E2bDa07360bD9ce9c943437e1EcD45','0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'];
  const leaves = wthitelist.map(x => keccak256(x));
  const tree = new MerkleTree(leaves,keccak256);
  const root = tree.getHexRoot();
  console.log('root:',root);
  const proof = tree.getHexProof(keccak256('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'));

  


  let coronavirusDisease: Contract;
  let owner: SignerWithAddress;

  beforeEach('deploy coronavirusDisease and nft',async function(){
    [owner] = await ethers.getSigners();

    const CoronavirusDisease = await ethers.getContractFactory('CoronavirusDisease');
    const name = "Coronavirus disease vaccine";
    const symbol = "cdv";
    const uri = "wqwqwqwqwqwqwqwq";
    coronavirusDisease = await CoronavirusDisease.deploy(name,symbol,uri);
    await coronavirusDisease.deployed();

    await coronavirusDisease.setMerkleRoot(root);

  })


  it("测试白名单购买",async function () {
    const id = 0;
    const amount = 1;
    const value = 4000000000000000;
    await coronavirusDisease.whitelistPurchase(id,amount,proof,{value});
    const balance = await coronavirusDisease.balanceOf(owner.address,0);
    expect(await coronavirusDisease.balanceOf(owner.address,0)).to.eq(amount)
   
  });


})