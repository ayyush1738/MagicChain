import React, { useEffect, useState } from "react";
import { useOkto } from "okto-sdk-react";
import { useNavigate } from "react-router-dom";
import Tesseract from 'tesseract.js';
import profileicon from "./components/chillguy.png";

function HomePage() {
  console.log("HomePage component rendered");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [transferResponse, setTransferResponse] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const { getUserDetails, getPortfolio, createWallet, transferTokens, orderHistory } = useOkto();
  const [transferData, setTransferData] = useState({
    network_name: "",
    token_address: "",
    quantity: "",
    recipient_address: "",
  });
  const [userdb, setuserdb] = useState({
    email: "",
    address: "",
    quantity: "",
    coin: ""
  });
  const [orderData, setOrderData] = useState({
    order_id: "",
  });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [billAmount, setBillAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  // Combining add_user and get_user logic in one useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Creating wallet and fetching portfolio
        const walletsData = await createWallet();
        const portfolio = await getPortfolio();
        console.log(portfolio)
        console.log(walletsData)
        console.log("Wallets created:", walletsData.wallets[1].address);
        console.log("Portfolio fetched:", portfolio.tokens[0].quantity);
        const details = await getUserDetails();
        console.log(details.email)
        // Storing user details in the database
        // const addUserResponse = await fetch('http://localhost:3001/userstorage/user', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     emailid: details.email,
        //     address: walletsData.wallets[1].address,
        //     quantity: portfolio.tokens[0].quantity,
        //   }),
        // });
        // const addUserData = await addUserResponse.json();
        // console.log('User added:', addUserData);

        // Fetching user details
        
        console.log("User details fetched:", details.email);
        const portfolioDataa = await getPortfolio();
        console.log(portfolioDataa);
        // console
        const response = await fetch('http://localhost:3001/userstorage/updateprof', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: details.email , coin : portfolioDataa.tokens[0].quantity }),
        });
        const data = await response.json();
        console.log('Data:', data);

        // Fetch user data from the database
        const userResponse = await fetch('http://localhost:3001/userstorage/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: details.email }),
        });
        const userData = await userResponse.json();
        console.log('User data fetched:', userData);
        setuserdb(userData);

      } catch (error) {
        console.error('Error connecting or fetching user:', error);
      }
    };

    fetchData();
  }, [getUserDetails, getPortfolio, createWallet]);

  // Watch userdb for changes and log it
  useEffect(() => {
    if (userdb.email) {
      console.log('Userdb updated:', userdb);
    }
  }, [userdb]);

  const extractBillAmount = async () => {
    if (!image1) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    try {
      // Tesseract.js OCR processing
      const { data: { text } } = await Tesseract.recognize(image1, 'eng', {
        logger: (m) => console.log(m),
      });
      const amountMatch = text.match(/(\d+\.\d{2})/);
      console.log("Amount Match:", amountMatch[0]);
      setBillAmount(amountMatch ? amountMatch[1] : "Unable to detect amount");
      console.log(billAmount)
      if(amountMatch[0]>0){
        console.log(billAmount)
        try{
          const details = await getUserDetails();
          console.log(details.email)
          const portfolio = await getPortfolio();
          console.log(portfolio.tokens[0].quantity)
          const response = await fetch('http://localhost:3001/userstorage/updatecoins', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: details.email , coin : parseInt(amountMatch[0]), quantity: portfolio.tokens[0].quantity } ),
          });
          const data = await response.json();
          console.log('Data:', data);
          window.location.reload();
        }catch(err){
          console.log(err);
        }
      }
    } catch (error) {
      console.error('Error extracting bill amount:', error);
      setError("Failed to extract bill amount.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="bg-[#8B5DFF] p-6 mb-3 rounded-lg text-2xl shadow-lg shadow-purple-300 w-full sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4 flex">
        {/* Left Side (Existing Content) */}
        <div className="w-[60%] pr-4">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">Complete Your Submission</h1>
          <div className="bg-[#8B5DFF] p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center space-x-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Step 1: Upload the image of bill</h2>
                <p className="text-sm text-gray-300">Upload the image of your bill for verification.</p>
                <input
                  type="file"
                  onChange={handleImage1Change}
                  className="mt-2 block w-full text-sm text-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between items-center space-x-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Step 2: Upload the Selfie</h2>
                <p className="text-sm text-gray-300">Upload a selfie for identity verification.</p>
                <input
                  type="file"
                  onChange={handleImage2Change}
                  className="mt-2 block w-full text-sm text-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex justify-between items-center space-x-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Step 3: Submit</h2>
                <p className="text-sm text-gray-300">Once you're ready, click submit to complete the process.</p>
              </div>
              <button
                onClick={extractBillAmount}
                className="bg-purple-100 text-[#8B5DFF] font-semibold py-2 px-4 rounded-lg hover:bg-white focus:ring-4 focus:ring-purple-300"
                style={{ width: 'auto' }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Divider Line (Middle Separator) */}
        <div className="w-1 bg-white mx-4"></div>

        {/* Right Side (Profile Section) */}
        <div className="w-[40%] pl-4 flex flex-col items-start justify-center">
        <h2 className="text-2xl font-semibold mx-auto mb-3 text-white">Profile</h2> {/* Profile Heading */}
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
        <img 
          src={profileicon} 
          alt="Profile" 
          className="w-full h-full object-cover rounded-full" 
        />
</div>
          <div className="text-white text-left space-y-2">
            <p><span className="font-semibold">Email:</span> {userdb.email }</p>
            <p><span className="font-semibold">Quantity:</span> {userdb.coin } Magic Aptos</p>
            <p><span className="font-semibold">Quantit:</span> {userdb.quantity } APT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
