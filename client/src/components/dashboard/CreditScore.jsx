import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import { Box, Typography, ThemeProvider } from '@mui/material';
import theme from '../../styles/theme'
import { checkUserInfo } from '../../helpers';


const CreditScore = () => {
  const [advice, setAdvice] = useState("")

  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  // const value = 400;

  useEffect(() => {
    if (value > 739) {
      setAdvice("You're doing a great job! Keep up the good work")
    } else if (value > 580) {
      setAdvice("You have a Fair Credit score! To improve your Credit card Keep credit card balances low: High credit card balances can indicate to lenders that you may be overextended and may not be able to repay your debts. Try to keep your credit card balances as low as possible. Use a mix of credit types: Having a mix of different types of credit, such as credit cards, mortgages, and auto loans, can help improve your credit score. Dispute errors: If you find errors on your credit report, dispute them with the credit bureaus. Correcting errors on your credit report can help improve your credit score. Limit new credit applications: Every time you apply for credit, it results in a \"hard inquiry\" on your credit report, which can temporarily lower your credit score. Limit the number of new credit applications to minimize the impact on your score. Monitor your credit report: Regularly checking your credit report can help you stay on top of any changes and address any errors or fraudulent activity quickly. Be patient: Improving your credit score takes time, so be patient and stay committed to making positive changes to your credit habits.")
    } else if (value < 580) {
      setAdvice(" During this Cost of living crisis, make sure you're credit score is at least above 660. You might have missed a credit card payment or two in the past. It's important to pay on time whether you open a secured credit card or have an existing one. This is because payment history is one of the most important credit score factors.")
    }
    
  }, [])

  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'Poor', value: 580, color: '#e60133' },
    { name: 'Fair', value: 669, color: '#fe7743' },
    { name: 'Good', value: 739, color: '#ecb600' },
    { name: 'Very Good', value: 799, color: '#7ed856' },
    { name: 'Excellent', value: 900, color: '#008136' },
  ]

  const [value, setValue] = useState(0)

  useEffect(() => {
      setValue(checkUserInfo().creditScore)
  }, [])

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
        <p className="dashboard-balance-heading">Your Credit Score: <span className='dahsboard-credit-score'>{value}</span></p>
        <ThemeProvider theme={theme}>
          <Box className="dashboard-shadow credit-score-box" sx={{
            backgroundColor: 'secondary.main',
            borderRadius: 4,
            p: 2
          }}>
            <Typography variant='p' color='text.main'>
              {advice}
            </Typography>
          </Box>
        </ThemeProvider>
      </div>
    </>
  )
}

export default CreditScore