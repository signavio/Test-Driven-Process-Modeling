import React from 'react'
import SignavioMode from '../components/SignavioMode'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Authenticate user', async () => {
    render(<SignavioMode />)

    userEvent.click(screen.getByTestId('submit'))
    expect(await screen.findByTestId('solidity')).toBeInTheDocument()
})