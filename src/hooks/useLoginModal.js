import {useState} from 'react';


const initMod = {
  regOpen: false,
  logOpen: false
};


const useLoginModal = () => {
  const [modal, setModal] = useState(initMod);

  return {
    modal, 
    setModal
  }
}

export default useLoginModal;