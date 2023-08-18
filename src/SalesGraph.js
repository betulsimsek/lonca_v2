import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const SalesGraph = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      const orders = response.data;

      // Process the fetched data into the format needed for the chart
      const vendors = [];
      const itemCounts = [];

      orders.forEach((order) => {
        const vendorName = order.vendor_name;
        const itemCount = order.item_count;

        if (!vendors.includes(vendorName)) {
          vendors.push(vendorName);
          itemCounts.push({ [vendorName]: [itemCount] });
        } else {
          const vendorIndex = vendors.indexOf(vendorName);
          itemCounts[vendorIndex][vendorName].push(itemCount);
        }
      });

      // Create the chart data object
      const chartData = {
        labels: vendors,
        datasets: itemCounts.map((itemCount, index) => ({
          label: `Vendor ${index + 1}`,
          backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
          data: Object.values(itemCount)[0],
        })),
      };

      if (chartRef.current) {
        if (chartRef.current.chartInstance) {
          chartRef.current.chartInstance.destroy(); // Destroy the previous chart if it exists
        }

        setData(chartData);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      {data ? (
        <Bar
          ref={chartRef}
          data={data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalesGraph;
