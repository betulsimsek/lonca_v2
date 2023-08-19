import React, {  useState } from 'react';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([]);
  const [vendorName, setVendorName] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders?vendorName=${vendorName}`);
      const modifiedOrders = response.data.map((order) => ({
        ...order}));
      const groupedOrders = groupOrders(modifiedOrders);
      setOrders(groupedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const groupOrders = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((groupedOrder) => 
        groupedOrder.product_id === order.product_id && 
        groupedOrder.vendor_name === order.vendor_name
      );
      if (existingOrder) {
        existingOrder.total_count += order.item_count;
      } else {
        acc.push({
          ...order,
          total_count: order.item_count
        });
      }
      return acc;
    }, []);
    
    return groupedOrders;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="w-100 vh-10 d-flex justify-content-center align-items-center">
      <div className="w-150">
        <form onSubmit={handleSubmit}>
          <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder="Enter Vendor Name" />
          <button type="submit">Search</button>
        </form>
        <br />
        <table style={{ border: "1px solid black" }}> {/* Add inline styles with the border property */}
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Product ID</th>
              <th style={{ border: "1px solid black" }}>Parent Product Name</th>
              <th style={{ border: "1px solid black" }}>Vendor Name</th>
              <th style={{ border: "1px solid black" }}>Total Count</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: "1px solid black" }}>{order.product_id}</td>
                <td style={{ border: "1px solid black" }}>{order.parent_product_name}</td>
                <td style={{ border: "1px solid black" }}>{order.vendor_name}</td>
                <td style={{ border: "1px solid black" }}>{order.total_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;