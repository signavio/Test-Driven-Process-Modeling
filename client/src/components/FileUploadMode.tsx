import React from 'react'
import styled from 'styled-components'

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
/* justify-content:space-around; */
`

const InputStyle = styled.input`
    border-radius:8px;
    border:darkgray;
    padding:10px;
    background-color:cadetblue;
    color:white;
    height:30px;
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


const FileUpload: React.FC = () => {
    return (
        <Container>
            <FormStyle>
                <InputStyle type="file"></InputStyle>
                <SubmitButton type="submit" value="Upload" />
            </FormStyle>
        </Container>
    )
}

export default FileUpload