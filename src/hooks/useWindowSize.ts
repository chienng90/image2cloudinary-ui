/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

function useWindowSize() {
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowWidth;
}

export default useWindowSize;
