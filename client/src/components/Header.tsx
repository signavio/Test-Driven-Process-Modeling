import React from 'react'
import styled from 'styled-components'


const HeaderStyle = styled.a`
    display: flex;
    align-items: center;
    height: 56px;
    top:0;
    width:100%;
    border-style: solid;
    margin-top:0;
    border-width: 0;
    border-color: #777777; 
    background-color: rgb(173, 15, 91);
    cursor: pointer;`

const Heading = styled.h2`
    margin-right: 50px;
    margin-left: 50px;
    color: white;
    font-size: large;
    font-family: "Titillium Web",sans-serif;
`

const Header: React.FC = () => {
    const refreshPage = () => {
        window.location.reload()
    }
    return (
        <HeaderStyle onClick={refreshPage}>
            <Heading>TD-SCM</Heading>
            <Heading>Test-Driven Smart Contract Modeling</Heading>
        </HeaderStyle>
    )
}

export default Header