import ResultsListItem from './ResultsListItem';

const ResultsList = ({arr, handleNominate, app, setModal}) => {
  let parsedList = [];
  if(arr.length) {
    parsedList = arr.map((prop, index) => 
    <ResultsListItem {...prop} app={app} key={index} 
    handleNominate={handleNominate}
    setModal={setModal}
    />
    ) 
  }

  return (
    <div className='results-grid-container'>
      {parsedList}
    </div>
  )
}

export default ResultsList;