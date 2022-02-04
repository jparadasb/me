import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquareFull, faKeyboard} from '@fortawesome/free-solid-svg-icons';

const PressKey = ({icon, size, className, disappearAfterEvent, keyNames}) => {
  const [isHide, setHide] = useState(false);

  useEffect(() => {
    if (disappearAfterEvent) {
      const listener = document
          .addEventListener(
              disappearAfterEvent,
              (event) => {
                if (keyNames.includes(event.code)) {
                  setHide(true);
                }
              });
      return () => clearTimeout(disappearAfterEvent, listener);
    }

    return () => {};
  }, [disappearAfterEvent]);

  if (isHide) {
    return null;
  }
  return (
    <ul
      className={'base-press-key ' + className}
    >
      <li>
        <FontAwesomeIcon
          icon={faKeyboard}
          size={size}
        /></li>
      <li>

      </li>
      <li>
        <FontAwesomeIcon
          icon={icon}
          size={size}
          mask={faSquareFull}
        />
      </li>
    </ul>
  );
};

PressKey.defaultProps = {
  className: '',
  size: 'lg',
  keyNames: [],
};

PressKey.propTypes = {
  className: PropTypes.string,
  disappearAfterEvent: PropTypes.string,
  keyNames: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.object.isRequired,
  size: PropTypes.oneOf(
      ['xs',
        'sm',
        'lg',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x'],
  ),
};

export default PressKey;
