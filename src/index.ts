import crypto from 'crypto'

interface BlockShape {
  hash: string
  prevHash: string
  height: number
  data: number
}

class Block implements BlockShape {
  public hash: string
  constructor(
    public prevHash: string,
    public height: number,
    public data: number
  ) {
    this.hash = Block.calculateHash(prevHash, height, data)
  }
  static calculateHash(prevHash: string, height: number, data: number) {
    const toHash = `${prevHash}${height}${data}`
    return crypto.createHash('sha256').update(toHash).digest('hex')
  }
}

class Blockchain {
  private blocks: Block[]
  constructor() {
    this.blocks = []
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return ''
    return this.blocks[this.blocks.length - 1].hash
  }
  public addBlock(data: number) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data)
    this.blocks.push(newBlock)
  }
  public getBlocks() {
    return [...this.blocks]
  }
}

const blockchain = new Blockchain()

blockchain.addBlock(0o1)
blockchain.addBlock(0o2)
blockchain.addBlock(0o3)
blockchain.addBlock(0o4)

console.log(blockchain.getBlocks())
