import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
margin-left:25px;
display: flex;
flex-direction: column;
margin-top: 100px;
justify-content:baseline;
width:90%;
height: 60%;
align-items: center;
background-color:#096e75;
border-radius: 8px;
`

const FormStyle = styled.form`
margin-top:10px;
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

const SubmitButton = styled.input`
    border-radius: 8px;
    margin:10px;
    border-color:cadetblue;
    background-color:cadetblue;
    color:white;
    width:90px;
    height:40px;
    font-size:medium;
    font-weight:500;
    cursor: pointer;
    font-family: "Titillium Web",sans-serif;
    &:hover {
    transition: all .2s ease 0s;
    background-color: #5f947a;
    }
`
const SignavioMode: React.FC = () => {

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // To-do POST the credentials to the Signavio server and fetch the diagram xml
        // Then pass the details to the test module and then compile
    }
    return (
        <Container>
            <FormStyle onSubmit={handleFormSubmit}>
                <LabelStyle>Username:
                    <InputStyle type="text"></InputStyle>
                </LabelStyle>
                <LabelStyle>Password:
                    <InputStyle type="password"></InputStyle>
                </LabelStyle>
                <LabelStyle>Revision ID:
                    <InputStyle type="text"></InputStyle>
                </LabelStyle>
                <LabelStyle>Global variables:
                    <InputStyle type="text"></InputStyle>
                </LabelStyle>
                <LabelStyle>Contract Name:
                    <InputStyle type="text"></InputStyle>
                </LabelStyle>

                <SubmitButton type="submit" value="Submit" />
            </FormStyle>
        </Container>
    )
}

export default SignavioMode