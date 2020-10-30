import React from 'react';
import './App.css';
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import styled from 'styled-components'


const Container = styled.div`
  margin-left: 30px;
  margin-top:50px;
  width:95%;
  height:80vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f7f7f7;
`
function App() {
  return (
    <div>
      <Header />
      <Container>
        <LeftPanel />
        <RightPanel />
      </Container>
    </div>
  );
}

export default App;
