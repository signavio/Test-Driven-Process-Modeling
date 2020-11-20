import React from 'react'
import styled from 'styled-components'
import { CopyBlock, dracula } from "react-code-blocks"


const getTheme = (type: 'SOLIDITY' | 'BYTECODE' | 'ABI') => {
    switch (type) {
        case 'SOLIDITY':
            return styled.div`
                height: 200px;
                overflow-y: scroll;
                overflow-x:hidden;
                width: inherit;
                border-radius: 5px;
                margin: 10px;
            `
        case 'BYTECODE':
            return styled.div`
                height: 45px;
                overflow-y: scroll;
                overflow-x:hidden;
                width: inherit;
                border-radius: 5px;
                margin: 10px;
                background-color:rgb(40, 42, 54);
            `
        case 'ABI':
            return styled.div`
                height: 200px;
                overflow-y: scroll;
                overflow-x:hidden;
                width: inherit;
                border-radius: 5px;
                margin: 10px;
            `

        default:
            return styled.div`
            height: 200px;
            overflow-y: scroll;
            overflow-x:hidden;
            width: inherit;
            border-radius: 5px;
            margin: 10px;
        `
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