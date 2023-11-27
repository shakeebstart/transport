import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productsData, setProductsData] = useState([]);
  console.log("ll",searchValue);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setShowModal(false);
      return; // Exit the function early
    }
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'products'), where('tracking_id', '==', searchValue))
      );
  
      if (!querySnapshot.empty) {
        // Data found for the given tracking ID
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProductsData(data); // Update state with the retrieved data
        setShowModal(true);
  
        const firstProduct = data[0];
        console.log('Raw date from Firebase:', firstProduct.shipment_booked);
        console.log('Formatted date:', firstProduct.shipment_booked?.toDate().toLocaleString());
  
        console.log('Tracking ID related data:', data);
      } else {
        // No data found for the given tracking ID
        setShowModal(false);
        console.log('No data found for the tracking ID:', searchValue);
      }
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };
  
  return (
    <div className="slider-area ">
      <div className="slider-active">
        <div className="single-slider slider-height d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-9">
                <div className="hero__caption">
                  <h1>
                    Safe & Reliable <span>Logistic</span> Solutions!
                  </h1>
                </div>

                <form action="#" className="search-box" onSubmit={handleSearch}>
                  <div className="input-form">
                    <input
                      type="text"
                      placeholder="Your Tracking ID"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                  <div className="search-form">
                    <Button type="submit">Track & Trace</Button>
                  </div>
                </form>

                <div className="hero-pera">
                  <p>For order status inquiry</p>
                </div>

                {showModal && (
        <Modal productsData={productsData} onClose={() => setShowModal(false)} />
      )}
              </div>
            </div>

           
    

          </div>
        </div>
      </div>

    </div>
  );
}
const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 62px;
  background: #ff5f13;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  color: #fff;
  display: block;
  padding: 15px;
  border-radius: 0px;
  text-transform: uppercase;
  font-family: "Barlow", sans-serif;
  line-height: 1.2;
  line-height: 29px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.03em;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;
