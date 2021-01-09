import {useState} from 'react';
const init = {
  max:1,
  current: 1,
  default: 1
}

const usePagination = () => {
  const [page, setPage] = useState(init);

  const resetPagination = () => {
    setPage(init);
  }
  const goToPage = (e, val) => {
    setPage(prev => ({...page, current: val}))
  }

  return {
    page, 
    goToPage,
    resetPagination
  }
}

export default usePagination;