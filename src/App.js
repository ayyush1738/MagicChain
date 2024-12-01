import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Navbar from './navbar'; // Make sure you import the Navbar

const OKTO_CLIENT_API_KEY = "3c90ac0a-7bc0-4eef-a7c2-f725bcb240cf";

function App() {
  console.log('App component rendered');
  return (
    <Router>
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-deepPurple selection:text-white">
        {/* Background Gradient */}
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-grey bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Navbar component */}
      

        {/* Okto Provider for authentication */}
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <div className='container mx-auto px-8'>
          <Navbar/>
        </div>
          {/* Routing system */}
          <Routes className='container mx-auto px-6'>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </OktoProvider>
      </div>
    </Router>
  );
}

export default App;
