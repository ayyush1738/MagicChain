import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';


const OKTO_CLIENT_API_KEY = "3c90ac0a-7bc0-4eef-a7c2-f725bcb240cf";


function App() {
console.log('App component rendered');
return (
  <BrowserRouter>
  <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-deepPurple selection:text-white">
  <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-grey bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
  </div>
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <Routes className="container mx-auto px-8">
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </OktoProvider>
    </div>
  </BrowserRouter>
);
}

export default App;