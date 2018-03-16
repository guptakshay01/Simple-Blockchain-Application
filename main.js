const SHA256 = require('crypto-js/sha256');

/*class to create blocks*/
class Block{
	
	//creating each block
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;					//where the block sits on chain
		this.timestamp = timestamp;			//time of creating the block
		this.data = data,					//any data associated with block
		this.previousHash = previousHash;	//contains hash of previous block
		this.hash = this.calculateHash();	//will contain hash for current block
	}

	//calculating hash for current block
	//it will return 256 bit hash for the current block
	calculateHash(){
		return SHA256(this.index, this.timestamp, JSON.stringify(this.data), this.previousHash).toString();
	}
}