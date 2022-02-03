import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';


const SpriteCharacter = ({isWalking, name, fps, source}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const walkingInterval = setInterval(() => {
      if (isWalking) {
        if (currentFrame < (frames.length - 1)) {
          setCurrentFrame(currentFrame + 1);
        } else {
          setCurrentFrame(0);
        }
      }
    }, 1000 / fps);
    return () => clearInterval(walkingInterval);
  }, [isWalking, fps, currentFrame]);

  return (
    <section className={['sprite-character', name]}>
      <img src={source} alt={`frame-${currentFrame}`} />
    </section>
  );
};

SpriteCharacter.propTypes = {
  name: PropTypes.string,
  isWalking: PropTypes.bool,
  fps: PropTypes.number,
  focusHeight: PropTypes.number,
  focusWidth: PropTypes.number,
  source: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

SpriteCharacter.defaultProps = {
  name: '',
  isWalking: false,
  fps: 20,
};


export default SpriteCharacter;
