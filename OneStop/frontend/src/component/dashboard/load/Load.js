import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';

const Load = () => {
    
    const container = useRef(null);
  
    useEffect(() => {
      Lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('./loading.json'),
      });
      animate.setSpeed(0.7);
    }, []);
  
    return (
          <div className="loading-container" ref={container}></div>
    );
  };
  
  export default Load;