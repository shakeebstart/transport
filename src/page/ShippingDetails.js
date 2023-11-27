import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
// import Loader from "../Component/loader/Loader";
// import TopInfo from "../Component/Nav/TopInfo";
import NavBar from "../Component/Nav/NavBar";
// import Header from "../Component/Header";
// import Footer from "../Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ShippingDetails() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    tracking_id: "",
    shipment_booked: "",
    shipment_forwarded: "",
    waiting_for_clearance: "",
    out_for_delivery: "",
    delivered: "",
  });
  console.log("kk",newProduct);
  const [editProduct,setEditProduct]=useState('');
  const [isEdit,setIsEdit]=useState(false);
  const addData = async () => {
    try {
      // Add new product to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        ...newProduct,
        // Convert date strings to Firestore Timestamps
        shipment_booked: newProduct.shipment_booked
          ? new Date(newProduct.shipment_booked)
          : null,
        shipment_forwarded: newProduct.shipment_forwarded
          ? new Date(newProduct.shipment_forwarded)
          : null,
        waiting_for_clearance: newProduct.waiting_for_clearance
          ? new Date(newProduct.waiting_for_clearance)
          : null,
        out_for_delivery: newProduct.out_for_delivery
          ? new Date(newProduct.out_for_delivery)
          : null,
        delivered: newProduct.delivered
          ? new Date(newProduct.delivered)
          : null,
      });
  
      console.log("Product added with ID: ", docRef.id);
  
      // Clear the form after adding the product
      setNewProduct({
        product_name: "",
        tracking_id: "",
        shipment_booked: "",
        shipment_forwarded: "",
        waiting_for_clearance: "",
        out_for_delivery: "",
        delivered: "",
      });
  
      // Fetch updated products list
      getProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      if (!querySnapshot.empty) {
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } else {
        console.log("No documents found in the 'products' collection");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const editData= async(id)=>{
    try{
      setIsEdit(true)
      const productDoc = doc(db, "products", id);
      const productSnapshot = await getDoc(productDoc);
      if(productSnapshot.exists()){
        const productData=productSnapshot.data();
        
        setEditProduct({
          id:id,
          product_name: productData.product_name,
          tracking_id: productData.tracking_id,
          shipment_booked: productData.shipment_booked?.toDate(),
          shipment_forwarded: productData.shipment_forwarded?.toDate(),
          waiting_for_clearance: productData.waiting_for_clearance?.toDate(),
          out_for_delivery: productData.out_for_delivery?.toDate(),
          delivered: productData.delivered?.toDate(),
        });
      }else{
        console.log("Product not found");
      }
    }catch(err){
      console.error("Error fetching product details:", err);
    }
  }
  const updateData = async () => {
    try {
      const productDoc = doc(db, "products", editProduct.id);
      await updateDoc(productDoc, {
        product_name: editProduct.product_name,
        tracking_id: editProduct.tracking_id,
        shipment_booked: editProduct.shipment_booked,
        shipment_forwarded: editProduct.shipment_forwarded,
        waiting_for_clearance: editProduct.waiting_for_clearance,
        out_for_delivery: editProduct.out_for_delivery,
        delivered: editProduct.delivered,
      });
  
      // Clear the edit state and fetch updated products list
      setEditProduct('');
      getProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const deleteData = async (id) => {
    try {
      // Display a confirmation prompt
      const userConfirmed = window.confirm("Are you sure you want to delete this item?");
  
      if (userConfirmed) {
        const productDoc = doc(db, "products", id);
        await deleteDoc(productDoc);
  
        // Fetch updated products list after deletion
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  return (
<div className="container ">
      {/* <Loader/> */}
      {/* <TopInfo /> */}
      <NavBar />
      {/* <Header/> */}
      <label htmlFor="productName"className="text-white">Name:</label>
 <input
  id="productName"
  className="form-control mb-2"
  placeholder="Enter product name..."
  // value={newProduct.product_name || ''}
  value={isEdit?editProduct.product_name:newProduct.product_name}
  onChange={(e) =>
    isEdit?
    setEditProduct({ ...editProduct, product_name: e.target.value }):
    setNewProduct({ ...newProduct, product_name: e.target.value })
  }
/>

<label htmlFor="trackingId" className="text-white">Tracking ID:</label>
<input
  id="trackingId"
  className="form-control mb-2"
  type="number"
  placeholder="Enter tracking ID..."
  // value={editProduct.tracking_id || ''}
  value={isEdit?editProduct.tracking_id:newProduct.tracking_id}
  // onChange={(e) =>
  //   setEditProduct({ ...editProduct, tracking_id: e.target.value })
  // }
  onChange={(e)=>{
    isEdit?setEditProduct({ ...editProduct, tracking_id: e.target.value }):
    setNewProduct({ ...newProduct, tracking_id: e.target.value })
  }}
/>

<label htmlFor="shipmentBooked" className="text-white">Shipment Booked:</label>
<input
  id="shipmentBooked"
  className="form-control mb-2"
  type="datetime-local"
  value={
    isEdit
      ? editProduct.shipment_booked
        ? new Date(
            editProduct.shipment_booked.getTime() -
              editProduct.shipment_booked.getTimezoneOffset() * 60000
          )
          .toISOString().slice(0, 16)
        : ""
      : newProduct.shipment_booked
      ? new Date(
          newProduct.shipment_booked.getTime() -
            newProduct.shipment_booked.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 16)
      : ""
  }
  onChange={(e) => {
    const newDate = new Date(e.target.value);
    // const adjustedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
    isEdit
      ? setEditProduct({ ...editProduct, shipment_booked: newDate })
      : setNewProduct({ ...newProduct, shipment_booked: newDate });
  }}
/>


<label htmlFor="shipmentForwarded"className="text-white">Shipment Forwarded:</label>
<input
  id="shipmentForwarded"
  className="form-control mb-2"
  type="datetime-local"
  value={
    isEdit
      ? editProduct.shipment_forwarded
        ? new Date(
           editProduct.shipment_forwarded.getTime() -

          editProduct.shipment_forwarded.getTimezoneOffset() * 60000
          ) 
          .toISOString().slice(0, 16)
        : ""
      : newProduct.shipment_forwarded
      ?new Date(
       newProduct.shipment_forwarded.getTime() -

        newProduct.shipment_forwarded.getTimezoneOffset() * 60000
        )
        .toISOString().slice(0, 16)
      : ""
  }
  onChange={(e) => {
    const newDate = new Date(e.target.value);
    isEdit
      ? setEditProduct({ ...editProduct, shipment_forwarded: newDate })
      : setNewProduct({ ...newProduct, shipment_forwarded: newDate });
  }}
/>


<label htmlFor="waitingClearance" className="text-white">Waiting for Clearance:</label>
<input
  id="waitingClearance"
  className="form-control mb-2"
  type="datetime-local"
  value={
    isEdit
      ? editProduct.waiting_for_clearance
        ?new Date(
          editProduct.waiting_for_clearance.getTime() -
          editProduct.waiting_for_clearance.getTimezoneOffset() * 60000
          )
          .toISOString().slice(0, 16)
        : ""
      : newProduct.waiting_for_clearance
      ?new Date(
        newProduct.waiting_for_clearance.getTime() -
      
       newProduct.waiting_for_clearance.getTimezoneOffset() * 60000
      )
       .toISOString().slice(0, 16)
       : ""
  }
  onChange={(e) => {
    const newDate = new Date(e.target.value);
    isEdit
      ? setEditProduct({ ...editProduct, waiting_for_clearance: newDate })
      : setNewProduct({ ...newProduct, waiting_for_clearance: newDate });
  }}
/>

<label htmlFor=""className="text-white">Out For Delivery:</label>
<input
  className="form-control mb-2"
  type="datetime-local"
  placeholder="OUT FOR DELIVERY..."
  // value={editProduct.out_for_delivery ? editProduct.out_for_delivery.toISOString().slice(0, 16) : ''}
  value={
    isEdit
      ? editProduct.out_for_delivery
        ?new Date(
          editProduct.out_for_delivery.getTime() -
           editProduct.out_for_delivery.getTimezoneOffset() * 60000
        )
        .toISOString()
        .slice(0, 16)
        : ""
      : newProduct.out_for_delivery
      ? new Date(
        newProduct.out_for_delivery.getTime() -

        newProduct.out_for_delivery.getTimezoneOffset() * 60000
        )
        .toISOString().slice(0, 16)
      : ""
  }
  onChange={(e) => {
    const newDate = new Date(e.target.value);

    // if (editProduct) {
      isEdit?
      // Editing an existing product
      setEditProduct({ ...editProduct, out_for_delivery: newDate }):
    // } else {
      // Adding a new product
      setNewProduct({ ...newProduct, out_for_delivery: newDate });
    // }
  }}
/>

<label htmlFor=""className="text-white">Delivered:</label>

<input
  className="form-control mb-2"
  type="datetime-local"
  placeholder="DELIVERED..."
  value={
    isEdit
      ? editProduct.delivered
        ? new Date(
          editProduct.delivered.getTime() -
          editProduct.delivered.getTimezoneOffset() * 60000
          )  .toISOString()
          .slice(0, 16)
        : ""
      : newProduct.delivered
      ? new Date(
          newProduct.delivered.getTime() -
            newProduct.delivered.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16)
      : ""
  }
  onChange={(e) => {
    const selectedDate = new Date(e.target.value);

    isEdit
      ? setEditProduct({
          ...editProduct,
          delivered: selectedDate,
        })
      : setNewProduct({
          ...newProduct,
          delivered: selectedDate,
        });
  }}
/>



<button className="btn btn-dark" onClick={editProduct.id ? updateData : addData}>
  {editProduct.id ? 'UPDATE' : 'CREATE'}
</button>
      <h2 className="mt-4 mb-2 text-white">Product Shipping Details</h2>
<div className="table-responsive">
  <table className="table table-bordered table-striped">
    <thead className="thead-dark">
      <tr>
        <th className="bg-primary text-white">Name</th>
        <th className="bg-primary text-white">Tracking Id</th>
        <th className="bg-primary text-white">Shipment Booked</th>
        <th className="bg-primary text-white">Shipment Forwarded</th>
        <th className="bg-primary text-white">Waiting For Clearance</th>
        <th className="bg-primary text-white">Out For Delivery</th>
        <th className="bg-primary text-white">Delivered Date</th>
        <th className="bg-primary text-white">Action</th>
      </tr>
    </thead>
    <tbody>
      {products?.map((shippingDet, i) => (
        <tr key={i}>
          <td className="text-white">{shippingDet.product_name}</td>
          <td className="text-white">{shippingDet.tracking_id}</td>
          <td className="text-white">{shippingDet.shipment_booked?.toDate().toLocaleString()}</td>
          <td className="text-white">{shippingDet.shipment_forwarded?.toDate().toLocaleString()}</td>
          <td className="text-white">{shippingDet.waiting_for_clearance?.toDate().toLocaleString()}</td>
          <td className="text-white">{shippingDet.out_for_delivery?.toDate().toLocaleString()}</td>
          <td className="text-white">{shippingDet.delivered?.toDate().toLocaleString()}</td>
          <td>
          <FontAwesomeIcon
          icon={faEdit}
          className="mr-2"
          title="Edit"
          color="#fff"
          onClick={() => editData(shippingDet.id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          title="Delete"
          color="#fff"
          onClick={() => deleteData(shippingDet.id)}
        />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}