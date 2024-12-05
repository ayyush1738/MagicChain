import React, { useState } from 'react';
// import axios from 'axios';
import { useOkto } from "okto-sdk-react";

export default function Shop() {
  // Array with 5 different offers
  const offers = [
    { aptos: 1, aptCoins: 10 },
    { aptos: 2, aptCoins: 22 },
    { aptos: 3, aptCoins: 35 },
  ];

  const offer = [
    { aptos: 100, aptCoins: 50 },
    { aptos: 200, aptCoins: 125 },
    { aptos: 300, aptCoins: 200 },
  ];

  const { getUserDetails } = useOkto();


  // State to keep track of claimed offers
  const [claimedOffers, setClaimedOffers] = useState(Array(offers.length).fill(false));

  const [showOffers, setShowOffers] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);


  // Handle claim button click
  const handleClaim = async (index) => {

    const url = 'https://sandbox-api.okto.tech/api/v1/transfer/tokens/execute';
    const val = offers[index].aptos.toString();
    console.log(val);
    const token = JSON.parse(localStorage.getItem('AUTH_DETAILS'));
    console.log(token.authToken);
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${token.authToken}`, 'Content-Type': 'application/json'},
      body: `{"network_name":"APTOS_TESTNET","token_address":"","quantity": "${val}","recipient_address":"0x1e0490dc9eaacd3a95a577f9d700501e490792480c9d7a83e1583fb86f960383"}`
    };
    console.log(offers[index].aptos)
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if(data.status === 'success') {
        const newClaimedOffers = [...claimedOffers];
        newClaimedOffers[index] = true;
        setClaimedOffers(newClaimedOffers);
        try{
          const details = await getUserDetails();
          console.log(details.email)
          const response = await fetch('http://localhost:3001/userstorage/updatecoins', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: details.email , coin : offers[index].aptCoins }),
          });
          const data = await response.json();
          console.log('Data:', data);
          // window.location.reload();
        }catch(err){
          console.log(err);
        }
      }
    } catch (error) {
      console.error(error);
    }

    // Set the offer as claimed
   
  };

  return (
  <div className="space-y-6 p-6">
    {/* First Row of 3 Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative h-[18em] w-full border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group/card hover:-translate-y-1"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]" />

          {/* Radial Gradient Animation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse" />

          {/* Top Corner Dots */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-300/50" />
            <div className="w-2 h-2 rounded-full bg-purple-300/30" />
            <div className="w-2 h-2 rounded-full bg-purple-300/10" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
            <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
              Shop
            </h1>
            <p className="text-[0.9em] text-purple-100/90 leading-relaxed font-light">
              Buy ${offers[index].aptCoins} worth of Magic Aptos at  {offers[index].aptos} APT Token.
            </p>
          </div>

          {/* Button */}
          <button
            className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-purple-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10"
            onClick={() => handleClaim(index)}
            disabled={claimedOffers[index]} // Change state to show offers
          >
            <p className="relative z-10 font-medium tracking-wide">Buy Now</p>
          </button>
        </div>
      ))}
    </div>

    {/* Second Row of 3 Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative h-[18em] w-full border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group/card hover:-translate-y-1"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]" />

          {/* Radial Gradient Animation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse" />

          {/* Top Corner Dots */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-300/50" />
            <div className="w-2 h-2 rounded-full bg-purple-300/30" />
            <div className="w-2 h-2 rounded-full bg-purple-300/10" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
            <h1 className="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
              Redeem
            </h1>
            <p className="text-[0.9em] text-purple-100/90 leading-relaxed font-light">
              Redeem ${offer[index].aptCoins} worth of Zomato Copuns for  {offer[index].aptos} Magic Aptos.
            </p>
          </div>

          {/* Button */}
          <button
            className="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-purple-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10"
            onClick={() => setShowOffers(true)} // Change state to show offers
          >
            <p className="relative z-10 font-medium tracking-wide">Redeem Now</p>
          </button>
        </div>
      ))}
    </div>
  </div>
);  
}