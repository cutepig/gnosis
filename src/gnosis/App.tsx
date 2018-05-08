import * as React from 'react';
import * as cx from 'classnames';
import {Camera, Mic, Globe} from 'react-feather';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="bg-near-white near-black min-vh-100 courier">
        <div className="flex flex-column mw7 pa4 center">
          <header className="pt3">
            <img src={logo} className="db center w3" alt="logo" />
            <h1 className="mt2 f5 tc">Gnosis</h1>
          </header>
          <main className="pt5 flex-auto">
            <CommandContainer>
              <CommandText text="Can you hear us?" />
            </CommandContainer>
            <InputContainer>
              <Input label="Answer" placeholder="..." cls="mt5" />
              <InputCamera />
              <InputMicrophone />
              <InputSpread />
            </InputContainer>
          </main>
        </div>
      </div>
    );
  }
}

interface ICommandText {
  text: string;
}

const CommandText: React.StatelessComponent<ICommandText> = ({text}) => (
  <p className="f5 mv0 b lh-copy courier">{text}</p>
);

const CommandContainer: React.StatelessComponent = ({children}) => (
  <div className="ph5 pv7 tc">{children}</div>
);

const InputContainer: React.StatelessComponent = ({children}) => (
  <div className="w5 center">{children}</div>
);

interface IInput {
  placeholder: string;
  label: string;
  cls?: string;
}

const Input: React.StatelessComponent<IInput> = ({children, placeholder, label, cls}) => (
  <input
    aria-label={label}
    placeholder={placeholder}
    className={cx('input-reset db center pa3 bg-transparent bn bb b--near-black near-black', cls)}
  />
);

interface IInputButton {
  label: string;
  cls?: string;
  onClick?: any;
}

const InputButton: React.StatelessComponent<IInputButton> = ({children, label, cls, onClick}) => (
  <button
    aria-label={label}
    className={cx(
      'w-100 input-reset pa3 ba b--near-black flex flex-row justify-center items-center',
      cls,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const InputCamera = () => (
  <InputButton label="Take Photo">
    <div className="mr3">
      <Camera />
    </div>
    <CommandText text="Be our eyes" />
  </InputButton>
);

const InputMicrophone = () => (
  <InputButton label="Capture Audio">
    <div className="mr3">
      <Mic />
    </div>
    <CommandText text="Be our ears" />
  </InputButton>
);

const InputSpread = () => (
  <InputButton label="Spread the appp">
    <div className="mr3">
      <Globe />
    </div>
    <CommandText text="Spread" />
  </InputButton>
);

export default App;
