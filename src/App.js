import React, { useState, useEffect } from 'react';
import Ticker from './components/tickers/Ticker';
import NavComponent from './components/layouts/NavComponent';

const App = () => {
  return (
    <>
      <NavComponent/>
      <div className="main pt-4">
        <Ticker/>
      </div>
    </>
  );
};

export default App;