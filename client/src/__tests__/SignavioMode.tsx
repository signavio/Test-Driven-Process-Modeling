import React from 'react'
import SignavioMode from '../components/SignavioMode'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import authenticateUser from '../api/authenticateUser'

const mockedAuthenticateUser = authenticateUser as jest.Mock<any>;

jest.mock('../api/authenticateUser')
test('Authenticate user', async () => {

    const response = {
        data: {
            status: 200,
            message: 'Success',
            data: {
                ABI: 'abi',
                Bytecode: 'byteCode',
                Solidity: 'Solidity'
            }
        }
    }

    mockedAuthenticateUser.mockImplementation(() => (response))

    render(<SignavioMode />)

    userEvent.click(screen.getByTestId('submit'))
    expect(await screen.findByTestId('solidity')).toBeInTheDocument()
})