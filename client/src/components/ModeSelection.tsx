import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 100px;
justify-content:baseline;
height: 40%;
align-items: center;
`

const ModeButton = styled.button`
    background-color:#096e75;
    color:white;
    height:50px;
    font-size: medium;
    cursor: pointer;
    width:90%;
    margin-bottom:10px;
`

const Heading = styled.h4`
text-align:center;
color: #096e75;
font-family: "Titillium Web",sans-serif;
`
const ModeSelection: React.FC = () => {
    return (
        <Container>
            <Heading>Choose your mode for importing the BPMN 2.0 XMl file</Heading>
            <ModeButton>Login with Signavio</ModeButton>
            <ModeButton>Use file upload</ModeButton>
        </Container>
    )
}

export default ModeSelection