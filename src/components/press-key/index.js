import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import PropTypes, {oneOf} from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquareFull, faKeyboard} from '@fortawesome/free-solid-svg-icons';

import './press-key.scss';

const getDimesions = (element) => {
  const {
    height: heightString,
    width: widthString,
  } = getComputedStyle(element);
  return [
    parseFloat(heightString),
    parseFloat(widthString),
  ];
};

const getParentDimesions = (element, isFixed) => {
  if (isFixed) {
    return [window.innerHeight, window.innerWidth];
  }
  const {
    height: heightString,
    width: widthString,
  } = getComputedStyle(element.parentElement);

  return [
    parseFloat(heightString),
    parseFloat(widthString),
  ];
};

const getCenterCoordinates = (totalSize, objectSize) => {
  return (totalSize / 2) - (objectSize / 2);
};

const getPosition = ([node, position, isFixed]) => {
  const {x, y} = position;
  const [height, width] = getDimesions(node);
  const [
    parentHeight,
    parentWidth,
  ] = getParentDimesions(node, isFixed);

  switch (`${x}-${y}`) {
    case 'left-top':
      return {top: 0, left: 0};
    case 'right-top':
      return {top: 0, right: 0};
    case 'left-bottom':
      return {bottom: 0, left: 0};
    case 'right-bottom':
      return {bottom: 0, right: 0};
    case 'center-bottom':
      return {bottom: 0, right: getCenterCoordinates(parentWidth, width)};
    case 'center-top':
      return {top: 0, right: getCenterCoordinates(parentWidth, width)};
    case 'center-center': return {
      top: getCenterCoordinates(parentHeight, height),
      right: getCenterCoordinates(parentWidth, width),
    };
    default:
      return {
        top: 0,
        right: 0,
      };
  }
};

const useRefThroughtCallback = ([isFixed, position]) => {
  const ref = useRef(null);
  const setRef = useCallback((node) => {
    if (node) {
      const positionAttributes = getPosition([node, position, isFixed]);
      for (const key in positionAttributes) {
        if (node.style.hasOwnProperty(key)) {
          node.style[key] = `${positionAttributes[key]}px`;
        }
      }
    }

    ref.current = node;
  }, []);

  return setRef;
};

const PressKey = ({
  icon,
  size,
  className,
  disappearAfterEvent,
  keyNames,
  isFixed,
  position,
  message,
}) => {
  const [isHide, setHide] = useState(false);
  const selfRef = useRefThroughtCallback([isFixed, position]);
  useEffect(() => {
    if (disappearAfterEvent && !isHide) {
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
  }, [disappearAfterEvent, isHide]);

  if (isHide) {
    return null;
  }

  return (
    <ul
      ref={selfRef}
      className={'base-press-key ' + className}
    >
      <li>
        <FontAwesomeIcon
          icon={faKeyboard}
          size={size}
        /></li>
      <li>
        Press Key {message}
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
  isFixed: false,
  message: '',
};

const positionXShape = oneOf([
  'left',
  'right',
  'center',
]);

const positionYShape = oneOf([
  'bottom',
  'center',
  'top',
]);

PressKey.propTypes = {
  className: PropTypes.string,
  disappearAfterEvent: PropTypes.string,
  keyNames: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.object.isRequired,
  size: oneOf(
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
  isFixed: PropTypes.bool,
  position: PropTypes.shape({
    x: positionXShape,
    y: positionYShape,
  }),
  message: PropTypes.string,
};

export default PressKey;
