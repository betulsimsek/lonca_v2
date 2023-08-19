import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Title } from 'chart.js/auto';

// Your chart configuration code here

// Register the elements and scales before using them
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

// Your chart configuration code here


function App() {
  const [orders, setOrders] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  const groupOrders = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find(
        (groupedOrder) =>
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

  const generateChartData = (groupedOrders) => {
    const labels = [];
    const data = [];

    groupedOrders.forEach((order) => {
      const label = `${order.month}-${order.year}`;
      if (!labels.includes(label)) {
        labels.push(label);
        data.push(order.total_count);
      }
    });

    const dataset = {
      label: 'Total Item Count',
      data: data,
      fill: false,
      borderColor: 'blue',
      tension: 0.4
    };

    return {
      labels: labels,
      datasets: [dataset]
    };
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders?vendorName=${vendorName}`);
      const modifiedOrders = response.data.map((order) => ({
        ...order
      }));

      // Sort the modifiedOrders array by date
      modifiedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));

      const groupedOrders = groupOrders(modifiedOrders);
      setOrders(groupedOrders);

      const chartData = generateChartData(groupedOrders);
      setChartData(chartData);

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
      setChartOptions(chartOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vendorName !== '') {
      fetchOrders();
    }
  }, [vendorName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="w-100 vh-10 d-flex justify-content-center align-items-center">
      <div className="w-150">
        {chartData && (
          <div>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder="Enter Vendor Name" />
          <button type="submit">Fetch Orders</button>
        </form>
        <table style={{ border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>Product ID</th>
              <th style={{ border: '1px solid black' }}>Parent Product Name</th>
              <th style={{ border: '1px solid black' }}>Vendor Name</th>
              <th style={{ border: '1px solid black' }}>Total Count</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid black' }}>{order.product_id}</td>
                <td style={{ border: '1px solid black' }}>{order.parent_product_name}</td>
                <td style={{ border: '1px solid black' }}>{order.vendor_name}</td>
                <td style={{ border: '1px solid black' }}>{order.total_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
