import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';


const FramesCharacter = ({isWalking, frames, fps}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const walkingInterval = setInterval(() => {
      const lastFramePosition = frames.length - 1;
      if (isWalking && currentFrame < lastFramePosition) {
        return setCurrentFrame(currentFrame + 1);
      }
      return setCurrentFrame(0);
    }, 1000 / fps);
    return () => clearInterval(walkingInterval);
  }, [isWalking, fps, currentFrame]);

  return (
    <section className="frames-character">
      <img
        height={512}
        src={frames[currentFrame]}
        alt={`frame-${currentFrame}`}
      />
    </section>
  );
};

FramesCharacter.propTypes = {
  isWalking: PropTypes.bool,
  frames: PropTypes.arrayOf(PropTypes.string),
  fps: PropTypes.number,
};

FramesCharacter.defaultProps = {
  isWalking: false,
  frames: [],
  fps: 20,
};


export default FramesCharacter;
