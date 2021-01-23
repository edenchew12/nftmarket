const { assert } = require('chai')
const { FormControlStatic } = require('react-bootstrap')

const Items = artifacts.require('./Items.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Item', (accounts) => {
    let contract

    before(async () => {
        contract = await Items.deployed()
    })

    describe('deployment', async () => {
        it('deploy successfully', async () => {
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Items')
        })    
        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'ITEMS')
        })    
    })

    describe('minting', async () => {
        it('creates a new token', async () => {
            const result  = await contract.mint('EC058E')
            const totalSupply = await contract.totalSupply()
            //SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')
            //FAILURE: CANNOT MINT SAME ITEM TWICE
            await contract.mint('EC058E').should.be.rejected;
        })
    })

    describe('indexing', async () => {
        it('list items', async () => {
            //Mint 3 Tokens
            await contract.mint('252DDD')
            await contract.mint('252DSD')
            await contract.mint('252DAD')
            const totalSupply = await contract.totalSupply()
            
            let item
            let result = []
            
            for (var i = 1; i <= totalSupply; i++) {
                item = await contract.items(i-1)
                result.push(item)
            }

            let expected = ['EC058E',
                            '252DDD',
                            '252DSD',
                            '252DAD']
            assert.equal(result.join(','), expected.join(','))
        })
    })
})