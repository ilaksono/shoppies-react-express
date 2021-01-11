const lookup = {
  "Internet Movie Database": "https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png",
  "Rotten Tomatoes": "https://pbs.twimg.com/profile_images/1145693812464816128/9ZMAMaoT_400x400.png",
  "Metacritic": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1200px-Metacritic.svg.png"
}

const RatingTable = ({arr}) => {

  let parsedHeaders;
  let parsedRatings;
  if(arr.length) {
    parsedHeaders = arr.map((each, i) => 
      <td key={i}><img style={{borderRadius:"50%", border:"2px solid white"}} height="24" src={lookup[each.Source]} alt={each.Source}/></td>
    )
    parsedRatings = arr.map((each, i) => 
      <td key={i}>
        {each.Value}
      </td>
      )
  }
  return (
    <table className='details-table'>
      <tr>
      {parsedHeaders}
      </tr>
      {parsedRatings}
    </table>
  )

}

export default RatingTable;