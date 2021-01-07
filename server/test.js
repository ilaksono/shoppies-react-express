require('dotenv').config()
const fetch = require('node-fetch');
const a = [
  'all',
  null,
  null
]

// console.log({...a});

const func = (a,b = '',c = 1) => {
  console.log(`${a},${b},${c}`)
}
const asyncFunc = async (a, b = '', c = 1) => {
 try {
   const data = await fetch(
      `http://www.omdbapi.com/?s=${a}&y=${b}&page=${c}&type=movie&apikey=${process.env.OMDB_API_KEY}`
    )
    const json = await data.json();
    console.log(json)
    
   
 } catch(er) {
   console.log(er);
 } 
}
// func(...a);
// asyncFunc(...a);
