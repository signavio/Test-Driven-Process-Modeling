import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.post('/submit', (req, res, ctx) => {
    const response = {
      status: 200,
      message: 'Success',
      data: {
        ABI: 'abi',
        Bytecode: 'byteCode',
        Solidity: 'Solidity',
      },
    }
    return res(ctx.json(response))
  })
)
