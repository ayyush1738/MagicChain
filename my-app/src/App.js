import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Betting from './Betting';
import Shop from './Shop';
import Order from './Order';
import Transact from './Transact';
import './index.css';
import Navbar from './navbar';
import Chat from './Chat';

const OKTO_CLIENT_API_KEY = "ff4a2b62-377f-4320-b650-5e1079dce8ba";


function App() {
console.log('App component rendered');
return (
  <BrowserRouter>
  <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-deepPurple selection:text-white">
        {/* Background Gradient */}
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-grey bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
    <div className='container mx-auto px-8'>
          <Navbar/>
        </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/arena" element={<Betting />} />
        <Route path="/market" element={<Shop />} />
        <Route path="/order" element={<Order />} />
        <Route path="/transact" element={<Transact />} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
      
    </OktoProvider>
    </div>
  </BrowserRouter>
);
}

export default App;