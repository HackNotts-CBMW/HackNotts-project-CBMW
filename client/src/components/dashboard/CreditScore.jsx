import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const CreditScore = () => {
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'Poor', value: 580, color: '#e60133' },
    { name: 'Fair', value: 669, color: '#fe7743' },
    { name: 'Good', value: 739, color: '#ecb600' },
    { name: 'Very Good', value: 799, color: '#7ed856' },
    { name: 'Excellent', value: 900, color: '#008136' },
  ]

  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 800;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 900;


    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;
  
    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba},${yba}L${xbb},${ybb},L${xp},${yp},L${xba},${yba}`} stroke="#none" fill={color} />,
    ];
  };


  return(
    <>
      <div className='pie-chart-container'>
        <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, '#4738c7')}
        </PieChart>
        <p className="dashboard-balance-heading">Your Credit Score:</p>
      </div>
    </>
  )
}

export default CreditScore