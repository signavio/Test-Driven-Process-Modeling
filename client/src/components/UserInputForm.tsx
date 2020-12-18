import React, { Fragment, useReducer, useState } from 'react'
import styled from 'styled-components'
import postModelDetails from '../api/postModelDetails'
import DisplayContract from './DisplayContract'


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

type postModelDetailsStateType = {
    globalVariables: string
    contractName: string
    isLogging: boolean
    isError: boolean
    errorMessage: string
}
type postModelDetailsActionType = { type: 'SUBMIT' } | {
    type: 'FIELD' | 'ERROR'
    payload: string
    fieldName: string
}
const initialState: postModelDetailsStateType = {
    globalVariables: '',
    contractName: '',
    isLogging: false,
    isError: false,
    errorMessage: ''
}


const postModelDetailsReducer = (state = initialState, action: postModelDetailsActionType) => {
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

type Props = {
    xmlString: String,
}

const UserInputForm: React.FC<Props> = ({ xmlString }) => {

    const [state, dispatch] = useReducer(postModelDetailsReducer, initialState)
    const [contract, setContract] = useState<ContractType | null>(null)

    const handleFormSubmit = async (event: React.FormEvent) => {

        event.preventDefault()
        dispatch({
            type: "SUBMIT"
        })

        const {
            globalVariables,
            contractName } = state!

        const formData = {
            xmlString,
            globalVariables,
            contractName
        }


        const response = await postModelDetails(formData)
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
        <Fragment>
            {contract
                ? null
                : <FormStyle onSubmit={handleFormSubmit}>
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
        </Fragment >
    )
}

export default UserInputForm

