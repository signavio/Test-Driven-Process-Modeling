import React, { useState } from 'react'
import styled from 'styled-components'
import uploadFile from '../api/uploadFile'

const Container = styled.div`
margin-left:25px;
display: flex;
flex-direction: column;
margin-top: 100px;
justify-content:center;
width:90%;
height: 40%;
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

const InputStyle = styled.input`
    border-radius:8px;
    border:darkgray;
    padding:15px;
    background-color:cadetblue;
    color:white;
    cursor: pointer;
    font-size:medium;
    font-family: "Titillium Web",sans-serif;
    &:hover {
    transition: all .2s ease 0s;
    cursor: pointer;
    background-color: #5f947a
    }
`

const SubmitButton = styled.input`
    border-radius: 8px;
    margin-top:20px;
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

const isBpmnfile = (file: File) => {
    const { name, type } = file
    if (type === 'bpmn' || name.endsWith('.bpmn')) {
        return true
    }

    return false
}

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File>()

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (selectedFile && isBpmnfile(selectedFile)) {
            const data = new FormData()
            data.append('file', selectedFile)
            uploadFile(data)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target?.files![0])
        setSelectedFile(file)

    }
    return (
        <Container>
            <FormStyle onSubmit={handleFormSubmit}>
                <InputStyle type="file" onChange={handleFileChange}></InputStyle>
                <SubmitButton type="submit" value="Upload" />
            </FormStyle>
        </Container>
    )
}

export default FileUpload