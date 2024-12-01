import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';


const OKTO_CLIENT_API_KEY = "3c90ac0a-7bc0-4eef-a7c2-f725bcb240cf";


function App() {
console.log('App component rendered');
return (
  <Router>
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </OktoProvider>
  </Router>
);
}

export default App;