import { Doughnut } from 'react-chartjs-2';


const options = {
  responsive: true,
  title: {
    display: true,
    text: '# Nominations per Country',
    position: 'top'
  }

};

const color = [];
const bgColors = [];

const PieChart = ({ data }) => {
  let primed = {};
  if (data.length) {

    primed = {
      labels: data.map((each) => each.country),
      datasets: [{
        label: '# Nominations by Country',
        data: data.map(each => Number(each.count)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(0, 172, 193, 0.4)',
          'rgba(66, 4, 32, 0.4)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(0, 172, 193, 1)',
          'rgba(66, 4, 32, 1)'

        ],
        borderWidth: 1
      }]
    };
  }
  return (
    <>
      {
        data.length > 0 &&
        <Doughnut
          data={primed}
          options={options} width='200' height='200' />
      }
    </>
  );
};
export default PieChart;