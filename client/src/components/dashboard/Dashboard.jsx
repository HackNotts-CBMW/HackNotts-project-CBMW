import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Balance from './Balance';
import CreditScore from './CreditScore';
import GridDoughNotts from './GridDoughNotts';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
  <div className="App">
      <div className="dashboard-grid">
        <Balance />
        <CreditScore />
        <GridDoughNotts />
      </div>
  </div>
}

export default DashBoard