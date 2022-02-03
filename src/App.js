import React, {Component} from 'react';
import './App.css';

import FramesCharacter from './components/frames-character';
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
      </div>
    );
  }
}

export default App;
