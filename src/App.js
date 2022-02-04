import React, {Component} from 'react';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import './App.css';

import FramesCharacter from './components/frames-character';
import PressKey from './components/press-key';
import mainCharacterFrames from './images/characters/main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCharacterState: {
        isWalking: false,
      },
      frames: mainCharacterFrames,
    };

    const onKeyPressReducer = (action) => {
      const {mainCharacterState} = this.state;
      switch (action) {
        case 'ArrowDownKeyDown': {
          if (!mainCharacterState.isWalking) {
            this.setState({
              ...this.state,
              mainCharacterState: {
                ...mainCharacterState,
                isWalking: true,
              },
            });
          }
          break;
        }
        case 'ArrowDownKeyUp': {
          if (mainCharacterState.isWalking) {
            this.setState({
              ...this.state,
              mainCharacterState: {
                ...mainCharacterState,
                isWalking: false,
              },
            });
          }
          break;
        }
        default:
          break;
      }
    };

    this.onMouseWheelListener = document.addEventListener(
        'scroll',
        (event) => {
          console.log(event);
        },
    );

    this.onKeyDownListener = document
        .addEventListener(
            'keydown',
            (event) => onKeyPressReducer(event.code + 'KeyDown'),
        );
    this.onKeyUpListener = document
        .addEventListener(
            'keyup',
            (event) => onKeyPressReducer(event.code + 'KeyUp'),
        );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownListener);
    document.removeEventListener('keyup', this.onKeyUpListener);
    document.removeEventListener('scroll', this.onMouseWheelListener);
  }
  render() {
    const {mainCharacterState} = this.state;
    return (
      <div className="App">
        <FramesCharacter
          frames={this.state.frames}
          isWalking={mainCharacterState.isWalking}
          fps={20}
        />
        <PressKey
          disappearAfterEvent="keydown"
          keyNames={['ArrowDown']}
          icon={faArrowDown}
        />
      </div>
    );
  }
}

export default App;
