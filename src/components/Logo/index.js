const Logo = () => {

  return <div className='logo-container'>

    {
      window.innerWidth > 617 ?

        'SHOPPIES' :
        <img src='/img-src/logo.png' alt='Shoppies' style={{ width: 40 }} />
    }
  </div>;
};
export default Logo;