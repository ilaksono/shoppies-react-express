import {useState} from 'react';

const init = {
  reg: false,
  log: false,
  out: false,
  vote: false,
  unvote: false
}

const useSnackbar = () => {
  const [snack, setSnack] = useState(init);

  return {
    snack,
    setSnack
  }
}
export default useSnackbar;