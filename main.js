/*Class to create blocks*/
class Block{
	//creating each block
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;					//where the block sits on chain
		this.timestamp = timestamp;			//time of creating the block
		this.data = data,					//any data associated with block
		this.previousHash = previousHash;	//contains hash of previous block
		this.hash = '';						//will contain hash for this block
	}

}