const VideoEmbed = ({ yt }) => {
  return (
    <div className='vid-container'>
      {
        yt ?
          <iframe
            width={`${Math.min(560, window.innerWidth) - 20}`} height="315"
            src={`https://www.youtube.com/embed/${yt}`}
            frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen
          />
          :
          <div style={{
            maxWidth: '400px',
            padding: '50px',
            height: "100%"
          }}>
            No Trailer Available
          </div>
      }
    </div>

  );
};

export default VideoEmbed;