const VideoEmbed = ({ youtube_trailer_key }) => {

  return (
      <iframe
        width="560" height="315"
        src={`https://www.youtube.com/embed/ykC_wu6ffOU`}
        frameborder="0" allow="autoplay; encrypted-media" allowFullScreen
      />
  );
};

export default VideoEmbed;