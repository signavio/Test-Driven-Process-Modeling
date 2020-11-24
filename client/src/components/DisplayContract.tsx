import React from 'react'
import styled from 'styled-components'
import { CopyBlock, dracula } from "react-code-blocks"

const Solidity = styled.div`
height: 200px;
overflow-y: scroll;
overflow-x:hidden;
width: inherit;
border-radius: 5px;
margin: 10px;
`
const Bytecode = styled.div`
height: 45px;
overflow-y: scroll;
overflow-x:hidden;
width: inherit;
border-radius: 5px;
margin: 10px;
background-color:rgb(40, 42, 54);
`
const ABI = styled.div`
height: 200px;
overflow-y: scroll;
overflow-x:hidden;
width: inherit;
border-radius: 5px;
margin: 10px;
`

const Default = styled.div`
height: 200px;
overflow-y: scroll;
overflow-x:hidden;
width: inherit;
border-radius: 5px;
margin: 10px;
`
const getTheme = (type: 'SOLIDITY' | 'BYTECODE' | 'ABI') => {
    switch (type) {
        case 'SOLIDITY':
            return Solidity
        case 'BYTECODE':
            return Bytecode
        case 'ABI':
            return ABI
        default:
            return Default
    }
}

const getLanguage = (type: 'SOLIDITY' | 'BYTECODE' | 'ABI') => {
    switch (type) {
        case 'SOLIDITY':
            return 'javascript'
        case 'ABI':
            return 'json'
        case 'BYTECODE':
            return 'text'

        default:
            return 'javascript'
    }
}

type Props = {
    codeBlock: string
    type: 'SOLIDITY' | 'BYTECODE' | 'ABI'
}
const DisplayContract = ({ codeBlock, type }: Props) => {
    const ContractComponent = getTheme(type)
    const language = getLanguage(type)

    const SolidityBlock = <CopyBlock
        text={codeBlock}
        language={language}
        showLineNumbers={false}
        theme={dracula}
        wrapLines={true}
    />
    return (<ContractComponent> { SolidityBlock}</ContractComponent >)
}


export default DisplayContract