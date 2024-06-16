import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import styles from './ticker.module.css'
import { ClipLoader } from 'react-spinners';

const Ticker = () => {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'fb945d96-c8e9-4a00-ac84-d96b9c06584d';

  useEffect(() => {
    const fetchTickers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/v1/cryptocurrency/listings/latest', {
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
          params: {
            start: 1,
            limit: 5,
            convert: 'USD',
          },
        });
        setTickers(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickers();
  }, [apiKey]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <div>
      <h3 className='mb-4 mt-4 text-center text-white title'>Today's Cryptocurrency Prices</h3>
      <div className={styles.borderUnderText}></div>
      {/* <hr/> */}
      {loading ? (
        <ClipLoader className='mx-auto d-block mt-5' size={50} color={"#fff"} loading={loading} />
      ) : (
        <Row className='mt-5'>
          {tickers.map(ticker => (
            <>
              <Col lg="4" md="4" sm="6" xs="12" key={ticker.id} className='mb-3'>
                <Card className={styles.tickerCard}>
                  <Stack direction='horizontal' className='px-3'>
                    {
                      ticker.symbol === 'BTC' ?
                        <img width="52" height="52" src="https://img.icons8.com/color/96/bitcoin--v1.png" alt="bitcoin--v1"/>
                      : ticker.symbol === 'ETH' ?
                        <img width="52" height="52" src="https://img.icons8.com/color/52/ethereum.png" alt="ethereum"/>
                        : ticker.symbol === 'USDT' ?
                          <img width="52" height="52" src="https://img.icons8.com/color/52/tether--v1.png" alt="tether--v1"/>
                          : ticker.symbol === 'BNB' ?
                            <img width="52" height="52" src="https://img.icons8.com/external-black-fill-lafs/52/000000/external-BNB-cryptocurrency-black-fill-lafs.png" alt="external-BNB-cryptocurrency-black-fill-lafs"/>
                          : <img width="52" height="52" src="https://img.icons8.com/nolan/52/solana.png" alt="solana"/>
                    }
                    <Card.Body>
                      <Card.Title className='text-white pb-2 fw-medium'>
                        {ticker.name.toUpperCase()} ({ticker.symbol})
                      </Card.Title>
                      <Card.Text className='text-white'>
                        <Stack direction='horizontal' className='justify-content-between'>
                          <span className='text-white'>
                            {formatter.format(ticker.quote.USD.price)}
                          </span>
                          <span className={ticker.quote.USD.percent_change_1h < 0 ? 'text-danger' : 'text-success'}>
                            ({formatter.format(ticker.quote.USD.percent_change_1h)})
                          </span>
                        </Stack>
                      </Card.Text>
                    </Card.Body>
                  </Stack>
                </Card>
              </Col>
            </>
          ))}
          <Col className=''>
            <Card className={styles.other}>
              <Card.Body className='d-flex justify-content-center align-items-center'>
                <p className={`${styles.visit} mb-0 text-white`}>
                  Visit <a target='_blank' href='https://coinmarketcap.com/' className='text-primary '>CoinMarketCap</a> to see others
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Ticker;