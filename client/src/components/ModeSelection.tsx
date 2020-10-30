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
    border-color: #096e75;
    border-radius: 8px;
    color:white;
    height:50px;
    font-size: medium;
    cursor: pointer;
    width:90%;
    margin-bottom:10px;
    &:hover {
    transition: all .2s ease 0s;
    background-color: #00a7ac;
    }
`

const Heading = styled.h4`
text-align:center;
color: #096e75;
font-family: "Titillium Web",sans-serif;
`

type Mode = 'USE_SIGNAVIO' | 'USE_FILE_UPLOAD' | null

type Props = {
    mode: Mode
    changeMode: (incomingMode: Mode) => void
}

const ModeSelection: React.FC<Props> = ({ mode, changeMode }) => {
    return (
        <Container>
            <Heading>Choose your mode for importing the BPMN 2.0 XMl file</Heading>
            <ModeButton onClick={() => changeMode('USE_SIGNAVIO')}>Login with Signavio</ModeButton>
            <ModeButton onClick={() => changeMode('USE_FILE_UPLOAD')}>Use file upload</ModeButton>
        </Container>
    )
}

export default ModeSelection