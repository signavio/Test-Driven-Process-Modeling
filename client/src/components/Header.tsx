import React from 'react'
import styled from 'styled-components'


const HeaderStyle = styled.div`
    display: flex;
    align-items: center;
    height: 56px;
    top:0;
    width:100%;
    position:absolute;
    border-style: solid;
    margin-top:0;
    border-width: 0;
    border-color: #777777; 
    background-color: rgb(173, 15, 91);`

const Heading = styled.h2`
    margin-right: 50px;
    margin-left: 10px;
    color: white;
    font-size: 16px;
    font-family:sans-serif
`

const Header: React.FC = () => {
    return (
        <HeaderStyle>
            <Heading>TD-SCM</Heading>
            <Heading>Test-Driven Smart Contract Modeling</Heading>
        </HeaderStyle>
    )
}

export default Header