import DoughNotts from "./DoughNotts"

const GridDoughNotts = () => {
  const blockOneData = {
    labels: ['Spent', 'Left'],
    datasets: [
      {
        label: 'Amount of Money',
        data: [1200, 700],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const blockTwoData = {
    labels: ['Spent', 'Left'],
    datasets: [
      {
        label: 'Amount of Money',
        data: [800, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const blockThreeData = {
    labels: ['Spent', 'Left'],
    datasets: [
      {
        label: 'Amount of Money',
        data: [500, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const blockFourData = {
    labels: ['Spent', 'Left'],
    datasets: [
      {
        label: 'Amount of Money',
        data: [600, 500],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return(
    <>
      <div className="grid-dough-notts">
        <div className="grid-dough-notts-title-container">
          <h1 className="grid-dough-notts-title">Your spendings on each catergory</h1> 
        </div>
        <div className="block-one">
          <h3 className="grid-dough-notts-heading">Shopping</h3>
          <DoughNotts data={blockOneData} />
        </div>

        <div className="block-two">
          <h3 className="grid-dough-notts-heading">Food</h3>
          <DoughNotts data={blockTwoData} />
        </div>

        <div className="block-three">
          <h3 className="grid-dough-notts-heading">Rent & Bill</h3>
          <DoughNotts data={blockThreeData} />
        </div>

        <div className="block-four">
          <h3 className="grid-dough-notts-heading">Fun</h3>
          <DoughNotts data={blockFourData} />
        </div>
      </div>
    </>
  )
}

export default GridDoughNotts 