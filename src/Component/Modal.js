// Modal.js

import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Modal({ productsData, onClose }) {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleBackgroundClick = () => {
    onClose();
  };

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContent onClick={handleModalClick}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {/* Render the productsData in the modal */}
        {/* {productsData.map((product) => (
          <div key={product.id}>
            <p>Product ID: {product.id}</p>
            {/* Render other product details as needed */}
          {/* </div>
        ))} */}

        {/* Tracking List */}
        <TrackingList>
          {productsData.map((product) => (
            <TrackingItem key={product.id}>
              <Container>
              <div className="tracking-list-icon">
                <i className="fas fa-box"></i>
              </div>
              <div className="tracking-list-content">
                <h5>SHIPMENT BOOKED</h5>
                <p>{product.shipment_booked?.toDate().toLocaleString()}</p>
              </div>
              <div className="tracking-list-icon">
                  <i className="fas fa-warehouse"></i>
                </div>
              <div className="tracking-list-content">
                <h5>SHIPMENT FORWARDED</h5>
                <p>{product.shipment_forwarded?.toDate().toLocaleString()}</p>
              </div>
              <div className="tracking-list-icon">
                  <i className="fas fa-clock"></i>
                </div>
              <div className="tracking-list-content">
                <h5>WAITING FOR CLEARANCE</h5>
                <p>{product.waiting_for_clearance?.toDate().toLocaleString()}</p>
              </div>
              <div className="tracking-list-icon">
                  <i className="fas fa-truck"></i>
                </div>
              <div className="tracking-list-content">
                <h5>OUT FOR DELIVERY</h5>
                <p>{product.out_for_delivery?.toDate().toLocaleString()}</p>
              </div>
              <div className="tracking-list-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
              <div className="tracking-list-content">
                <h5>DELIVERED</h5>
                <p>{product.delivered?.toDate().toLocaleString()}</p>
              </div>
              </Container>
            </TrackingItem>
          ))}
        </TrackingList>
      </ModalContent>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
`;
const Container=styled.div`
display: flex;
   @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 80%; 
  max-width: 600px; 
  margin-top: 50px; 

  /* @media (max-width: 768px) {
    width: 90%;
  } */
`;

const CloseButton = styled.span`
  position: absolute;
  top: -12px;
  right: 5px;
  font-size: 30px;
  cursor: pointer;
  color: #555;
`;

const TrackingList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const TrackingItem = styled.li`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;

  .tracking-list-icon {
    margin-right: 10px;
  }
`;
