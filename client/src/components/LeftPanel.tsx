import React, { useState } from 'react'
import styled from 'styled-components'
import ModeSelection from './ModeSelection'
import SignavioMode from './SignavioMode'
import FileUpload from './FileUploadMode'

const Panel = styled.div`
    background-color: #e6eef0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction:column;

`

type Mode = 'USE_SIGNAVIO' | 'USE_FILE_UPLOAD' | null

const LeftPanel: React.FC = () => {

    const [mode, setMode] = useState<Mode>(null)

    const changeMode = (incomingMode: Mode) => {
        setMode(incomingMode)
    }

    const renderMode = () => {
        if (mode === 'USE_FILE_UPLOAD') {
            return (<FileUpload />)
        } else {
            return (<SignavioMode />)
        }
    }
    return (
        <Panel>
            {mode ? renderMode() : <ModeSelection mode={mode} changeMode={changeMode} />}
        </Panel>
    )
}

export default LeftPanel