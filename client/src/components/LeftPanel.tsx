import React from 'react'
import styled from 'styled-components'
import ModeSelection from './ModeSelection'

const Panel = styled.div`
    background-color: #e6eef0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction:column;

`
const LeftPanel: React.FC = () => {
    return (
        <Panel>
            <ModeSelection />
        </Panel>
    )
}

export default LeftPanel