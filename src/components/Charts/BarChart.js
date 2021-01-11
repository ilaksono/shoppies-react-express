import { Bar } from 'react-chartjs-2';


const lookup = {
  "votes": "# Votes",
  "revenueD": "High Revenue",
  "revenueA": "Low Revenue"
};

const BarChart = ({ dash }) => {
  const p = Object.keys(dash.options).find(key => dash.options[key]);
  let d = {};
  let options = {};
  if (p) {
    let yVals = [];
    if (p === 'votes') {
      yVals = dash.data.map(each => each.total);
    } else {
      yVals = dash.data.map(each => Number(each['revenue_usd']));
    }
    d = {
      labels: dash.data.map((each) => each.title),
      datasets: [{
        label: '',
        data: yVals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
    options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 4
          }
        }]
      },
      responsive: true,
      title: {
        display: true,
        text: lookup[p],
        position: 'top'
      }
    };
  }

  return (
    <Bar data={d} options={options} height='180' width='380' />
  );
};
export default BarChart;