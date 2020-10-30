import React from 'react'
import styled from 'styled-components'

const RightPanelDiv = styled.div`
    background-color: #e6eef0;
    width: 40%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    text-align:left;
    padding-left:10px;
    padding-right:10px;
`
const Heading = styled.h3`
text-align:center;
color: #096e75;
font-family: "Titillium Web",sans-serif;
font-weight:1000;
`

const TextStyle = styled.p`
color: #096e75;
`

const RightPanel: React.FC = () => {
    return (
        <RightPanelDiv>
            <Heading>How to use TD-SCM</Heading>
            <TextStyle><b>TD-SCM</b> is a tool that provides the user a platform to compile business process models to smart contract that can be deployed to a blockchain network using the test-driven approach.</TextStyle>
            <TextStyle>The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the Test driven development process in the business process modelling.</TextStyle>
            <TextStyle>The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the Test driven development process in the business process modelling.</TextStyle>
            <TextStyle>The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the Test driven development process in the business process modelling.</TextStyle>
            <TextStyle>The main motivation behind the conception of this tool is to provide an interface to test the correctness and integrity of a business process model before it is compiled and deployed to the blockchain network. This pre-check could potentially avoid the risk of deploying a smart contract with errors. The tool also embraces the Test driven development process in the business process modelling.</TextStyle>
        </RightPanelDiv>
    )
}

export default RightPanel