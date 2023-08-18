import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const calculateItemCountSum = (parentProductName, vendorName) => {
    return orders.reduce((sum, order) => {
      if (
        order.parent_product_name === parentProductName &&
        order.vendor_name === vendorName
      ) {
        return sum + order.item_count;
      }
      return sum;
    }, 0);
  };

  return (
    <div className="w-100 vh-10 d-flex justify-content-center align-items-center">
      <div className="w-150">
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Item Count</th>
              <th>Parent Product Name</th>
              <th>Vendor Name</th>
              <th>Payment At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.product_id}</td>
                <td>{order.item_count}</td>
                <td>{order.parent_product_name}</td>
                <td>{order.vendor_name}</td>
                <td>{order.payment_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Example usage of calculateItemCountSum */}
      <div>
        <p>Sum of item_count for 'Example Product' and 'Example Vendor': {calculateItemCountSum('36287 - Crop Top - Black', 'Tuba Butik')}</p>
      </div>
    </div>
  );
}

export default App;
