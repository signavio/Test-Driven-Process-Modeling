import React, { Fragment, ReactElement, useReducer, useState } from 'react'
import styled from 'styled-components'
import authenticateUser from '../api/authenticateUser'
import DisplayContract from './DisplayContract'

const Container = styled.div`
margin-left:25px;
display: flex;
flex-direction: column;
margin-top: 100px;
justify-content:baseline;
width:90%;
height: 70%;
align-items: center;
background-color:#096e75;
border-radius: 8px;
`

const FormStyle = styled.form`
margin-top:20px;
display: flex;
flex-direction: column;
align-items:flex-end;
`

const LabelStyle = styled.label`
color: white;
margin:5px;
font-size:medium;
font-weight:500;
font-family: "Titillium Web",sans-serif;
`

const InputStyle = styled.input`
    border-radius: 8px;
    margin:5px;
    color:#096e75;
    height:30px;
    font-size:medium;
    margin-bottom:10px;
    font-family: "Titillium Web",sans-serif;
    &:hover {
    transition: all .2s ease 0s;
    }
`

const SubmitButton = styled.button`
    border-radius: 8px;
    margin:10px;
    border-color:cadetblue;
    background-color:cadetblue;
    color:white;
    width:130px;
    height:40px;
    font-size:medium;
    font-weight:500;
    cursor: pointer;
    font-family: "Titillium Web",sans-serif;
    &:hover {
    transition: all .2s ease 0s;
    background-color: #5f947a;
    } 
    &:disabled {
        transition: all .2s ease 0s;
        background-color: #5f947a; 
        cursor:default
    }
`


const ErrorText = styled.p`
    color: red;
    font-weight: 500;
    font-size: large;
    font-family: "Titillium Web", sans-serif;
    text-align: center;

`

const Details = styled.label`
    color: white;
    margin-top: 10px;
    font-size: large;
    font-weight: 550;
    font-family: "Titillium Web", sans-serif;
`

type AuthenticationStateType = {
    username: string
    password: string
    revisionId: string
    globalVariables: string
    contractName: string
    isLogging: boolean
    isError: boolean
    errorMessage: string
}
type AuthenticationActionType = { type: 'SUBMIT' } | {
    type: 'FIELD' | 'ERROR'
    payload: string
    fieldName: string
}
const initialState: AuthenticationStateType = {
    username: '',
    password: '',
    revisionId: '',
    globalVariables: '',
    contractName: '',
    isLogging: false,
    isError: false,
    errorMessage: ''
}


const authenticateReducer = (state = initialState, action: AuthenticationActionType) => {
    switch (action.type) {
        case 'FIELD':
            return ({
                ...state,
                [action.fieldName]: action.payload
            })
        case 'SUBMIT':
            return ({
                ...state,
                isLogging: true,
                isError: false

            })
        case 'ERROR':
            return ({
                ...state,
                username: '',
                password: '',
                revisionId: '',
                globalVariables: '',
                contractName: '',
                isLogging: false,
                isError: true,
                errorMessage: action.payload
            })

        default:
            break;
    }
}


type ContractType = {
    ABI: string
    Bytecode: string
    Solidity: string
}

const SignavioMode: React.FC = () => {

    const [state, dispatch] = useReducer(authenticateReducer, initialState)
    const [contract, setContract] = useState<ContractType | null>(null)

    const handleFormSubmit = async (event: React.FormEvent) => {

        event.preventDefault()
        dispatch({
            type: "SUBMIT"
        })

        const { username,
            password,
            revisionId,
            globalVariables,
            contractName } = state!

        const formData = {
            username, password,
            revisionId,
            globalVariables,
            contractName
        }


        const response = await authenticateUser(formData)
        const { status, message, data } = response.data
        if (status === 200) {
            setContract(data)
        } else {
            dispatch({
                type: 'ERROR',
                fieldName: 'errorMessage',
                payload: message
            })
        }
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'FIELD',
            fieldName: event.target.name,
            payload: event.target.value
        })
    }


    return (
        <Container>
            {contract
                ? null
                : <FormStyle onSubmit={handleFormSubmit}>
                    <LabelStyle>Username:
                <InputStyle type="text" required name="username" value={state?.username} onChange={handleFieldChange} ></InputStyle>
                    </LabelStyle>
                    <LabelStyle>Password:
                <InputStyle type="password" required name="password" value={state?.password} onChange={handleFieldChange}></InputStyle>
                    </LabelStyle>
                    <LabelStyle>Revision ID:
                <InputStyle type="text" required name="revisionId" value={state?.revisionId} onChange={handleFieldChange}></InputStyle>
                    </LabelStyle>
                    <LabelStyle>Global variables:
                <InputStyle type="text" required name="globalVariables" value={state?.globalVariables}
                            onChange={handleFieldChange}></InputStyle>
                    </LabelStyle>
                    <LabelStyle>Contract Name:
                <InputStyle type="text" required name="contractName" value={state?.contractName} onChange={handleFieldChange}></InputStyle>
                    </LabelStyle>

                    <SubmitButton data-testid="submit" type="submit" disabled={state?.isLogging}>
                        {state?.isLogging ? 'Authenticating...' : 'Authenticate'}
                    </SubmitButton>
                </FormStyle>}
            {state?.isError
                ? <ErrorText>{state.errorMessage}</ErrorText>
                : null}

            {contract
                ? <Fragment>
                    <Details data-testid="solidity">Solidity code</Details>
                    <DisplayContract codeBlock={contract.Solidity} type='SOLIDITY' />
                </Fragment> : null}
            {contract
                ? <Fragment>
                    <Details>ABI</Details>
                    <DisplayContract codeBlock={contract.ABI} type='ABI' />
                </Fragment> : null}
            {contract
                ? <Fragment>
                    <Details>Bytecode</Details>
                    <DisplayContract codeBlock={contract.Bytecode} type='BYTECODE' />
                </Fragment>
                : null}
        </Container >
    )
}

export default SignavioMode

