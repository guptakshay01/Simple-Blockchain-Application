const SHA256 = require('crypto-js/sha256');

/*class to create blocks*/
class Block{
	
	//contructor will create each block
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;					//where the block sits on chain
		this.timestamp = timestamp;			//time of creating the block
		this.data = data,					//any data associated with block
		this.previousHash = previousHash;	//contains hash of previous block
		this.hash = this.calculateHash();	//will contain hash for current block
	}

	//calculating hash for current block
	//returns 256 bit hash for the current block
	calculateHash(){
		return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
	}
}

/*class to create blockchain*/
class Blockchain{

	//contructor to initalize the blockchain
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	//method to create first block of the chain
	createGenesisBlock(){ 
		return new Block(0,"01/01/2018","Gensis Block","0");
	}

	//returns last block of the chain
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	//adds new block to the chain
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	//validating the chain
	validateChain(){
		for(let i=1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			//checking the hash for current block
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			//checking the hash for previous block
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true; 
	}
}


/*Testing blockchain*/
//creating blockchain object
let altCoin = new Blockchain();

//adding blocks to current blockchain
altCoin.addBlock(new Block(1,"10/01/2018",{amount: 15}));
altCoin.addBlock(new Block(2,"15/01/2018",{amount: 25}));
altCoin.addBlock(new Block(3,"22/01/2018",{amount: 5}));
altCoin.addBlock(new Block(4,"30/01/2018",{amount: 100}));
altCoin.addBlock(new Block(5,"8/02/2018",{amount: 50}));

console.log(JSON.stringify(altCoin, null, 4));

console.log("\nIs blockchain valid? " + altCoin.validateChain());