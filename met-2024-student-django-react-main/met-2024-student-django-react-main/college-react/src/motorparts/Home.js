import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const barData = [
  { label: 'A', value: 5 },
  { label: 'B', value: 6 },
  { label: 'F', value: 7 },
];

function Home() {
  return (
    <div>
        <center>
            <div className="text-5xl font-bold p-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
                    Welcome to Motorparts CRM
                </span>
            </div>
            <hr />
        </center>
      <div className="mt-8">
        <BarChart
          width={500}
          height={300}
          data={barData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3182bd" />
        </BarChart>
      </div>
    </div>
  );
}

export default Home;
  
