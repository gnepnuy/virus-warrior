const {MerkleTree} = require('merkletreejs');

const keccak256 = require("keccak256");


const leaves = ['0xf71A370D35F70E4467A90BC696D48e357bA91A46','0xe63865c622E2bDa07360bD9ce9c943437e1EcD45','0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266']
               .map(x => keccak256(x));//所有叶子
const tree = new MerkleTree(leaves,keccak256);//用所有叶子创建出一个梅尔克树
const root = tree.getHexRoot();//获取根hash
const proof = tree.getHexProof(keccak256('0xf71A370D35F70E4467A90BC696D48e357bA91A46'));
console.log("root:",root);
console.log("proof:",proof);


// const leaves = ['a','b','c'].map(x => SHA256(x));//所有叶子

// const tree = new MerkleTree(leaves,SHA256);//用所有叶子创建出一个梅尔克树

// const root = tree.getRoot().toString('hex');//获取根hash

// const leaf = SHA256('a');//获取到一片叶子的hash

// const proof = tree.getProof(leaf);//获取到这片叶子存在这棵树上的证明

// console.log(tree.verify(proof,leaf,root));//验证证明

// //错误演示
// const badLeaves = ['1','2','3'].map(x => SHA256(x));
// const badTree = new MerkleTree(badLeaves,SHA256);
// const badLeaf = SHA256('1');
// const badProof = tree.getProof(badLeaf);//这里用了上面的梅尔克数来获取证明
// console.log(tree.verify(badProof,leaf,root));//参数大错乱








