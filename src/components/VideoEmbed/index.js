const VideoEmbed = ({ yt }) => {
  console.log(yt);
  return (
    <div className='vid-container'>
      <iframe
        width="560" height="315"
        src={`https://www.youtube.com/embed/${yt}`}
        frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen
      />
    </div>

  );
};

export default VideoEmbed;