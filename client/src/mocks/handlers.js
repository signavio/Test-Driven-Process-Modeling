import { rest } from 'msw'

const ABI = `[{
    "type":"event",
    "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
    "name":"Event"
    }, {
    "type":"event",
    "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
    "name":"Event2"
    }, {
    "type":"function",
    "inputs": [{"name":"a","type":"uint256"}],
    "name":"foo",
    "outputs": []
    }]`

const Solidity = `
pragma solidity >=0.4.16 <0.8.0;

    contract SimpleStorage {
        uint storedData;
    
        function set(uint x) public {
            storedData = x;
        }
    
        function get() public view returns (uint) {
            return storedData;
        }
    }
`

const Bytecode = `0xa5643bf20000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000464617665000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003`

const handlers = [
  rest.post('/submit', (req, res, ctx) => {
    const response = {
      status: 200,
      message: 'Success',
      data: {
        ABI,
        Bytecode,
        Solidity,
      },
    }
    return res(ctx.json(response))
  }),
]

export default handlers
