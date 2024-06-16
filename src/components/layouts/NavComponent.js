import React, { useState } from 'react'
import { Container, Modal, Nav, Navbar, Stack } from 'react-bootstrap'
import Wallet from '../wallet/Wallet'
import '../../custom.css';

function NavComponent() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar className="">
        <Container>
          <Navbar.Brand className='text-navbar' href="/">VGCrypto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Stack gap={4} direction='horizontal'>
                {
                  address && balance ?
                    <>
                      <Navbar.Text>
                        <span className='fw-bold text-white'>Address : 
                          <a className='ms-2 text-info' href='#' onClick={handleShow}>
                            Click to see
                          </a>
                        </span>
                      </Navbar.Text>
                      <Navbar.Text>
                        <span className='text-white'>Your Balance: {balance} (ETH)</span>
                      </Navbar.Text>
                    </>
                  : ''
                }
                <Navbar.Text>
                  <Wallet address={address} balance={balance} setAddress={setAddress} setBalance={setBalance} />
                </Navbar.Text>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>{address}</Modal.Body>
      </Modal>
    </>
  )
}

export default NavComponent