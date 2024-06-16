import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Web3 from 'web3';
import styles from './wallet.module.css'
import { ClipLoader } from 'react-spinners';

const Wallet = ({ setAddress, setBalance, address, balance }) => {
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState('Connect My Wallet')

  useEffect(() => {
    if (address && balance) {
      setButtonText('Wallet Already Connected')
    }
  })

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert('MetaMask is not installed yet, install it first');
    }
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAddress(account);
        const balance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(balance, 'ether'));
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button className={`${styles.btnGrad} d-flex align-items-center fw-medium ${address && balance ? 'disabled' : ''}`} onClick={connectWallet}>
      {buttonText}
      
      {loading ? '' : ( 
        address && balance ?
          <img className='ms-2' width="16" height="16" src="https://img.icons8.com/material-outlined/16/checkmark--v1.png" alt="checkmark--v1"/>
        :
        (
        <ClipLoader className='ms-2' size={16} color={"#fff"} loading={loading} />
      )
      
    )}
    </Button>
  )
};

export default Wallet;