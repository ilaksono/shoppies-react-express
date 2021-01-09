import ResultsListItem from './ResultsListItem';

const ResultsList = ({arr}) => {
  console.log(arr);
  let parsedList = [];
  if(arr.length) {
    parsedList = arr.map((prop, index) => 
    <ResultsListItem {...prop} key={index}/>
    ) 
  }

  return (
    <div className='results-grid-container'>
      {parsedList}
    </div>
  )
}

export default ResultsList;