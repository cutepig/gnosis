import * as React from 'react';
import * as cx from 'classnames';
import {Camera, Mic, Globe} from 'react-feather';
import {Subscribe, Container} from 'unstated';

import logo from './logo.svg';

interface IState {
  command: ECommand;
}

enum ECommand {
  'Intro',
  'Record',
  'Capture',
  'Grow',
  'ProcessPhoto',
  'ProcessAudio',
}

class CommandContainer extends Container<IState> {
  public state = {
    command: ECommand.Grow,
  };

  // TODO: capturePhoto, etc.
}

const Command = () => (
  <div className="ph5 pv7 tc">
    <Subscribe to={[CommandContainer]}>
      {command => {
        switch (command.state.command) {
          case ECommand.Intro:
            return <CommandText text="Welcome to Gnosis." />;
          case ECommand.Record:
            return <CommandText text="Be our ears." />;
          case ECommand.Capture:
            return <CommandText text="Be our eyes." />;
          case ECommand.ProcessAudio:
            return <CommandText text="What do you hear?" />;
          case ECommand.ProcessPhoto:
            return <CommandText text="What do you see?" />;
          case ECommand.Grow:
            return <CommandText text="We all are Gnosis." />;
          default:
            return <CommandText text="Welcome to Gnosis." />;
        }
      }}
    </Subscribe>
  </div>
);

const CommandInput = () => (
  <div className="w5 center">
    <Subscribe to={[CommandContainer]}>
      {command => {
        switch (command.state.command) {
          case ECommand.Intro:
            return <InputMicrophone />;
          // TODO: "Good to be here"
          case ECommand.Record:
            return <InputMicrophone />;
          case ECommand.Capture:
            return <InputCamera />;
          case ECommand.ProcessAudio:
            return <Input label="What do you hear?" placeholder="What do you hear?" />;
          case ECommand.ProcessPhoto:
            return <Input label="What do you see?" placeholder="What do you see?" />;
          case ECommand.Grow:
            return <InputGrow />;
          default:
            return <CommandText text="Welcome to Gnosis." />;
        }
      }}
    </Subscribe>
  </div>
);

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
            <Command />
            <CommandInput />
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

/* const CommandContainer: React.StatelessComponent = ({children}) => (
  <div className="ph5 pv7 tc">{children}</div>
);
*/

/*const InputContainer: React.StatelessComponent = ({children}) => (
  <div className="w5 center">{children}</div>
);
*/

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
    <CommandText text="Capture" />
  </InputButton>
);

const InputMicrophone = () => (
  <InputButton label="Capture Audio">
    <div className="mr3">
      <Mic />
    </div>
    <CommandText text="Record" />
  </InputButton>
);

const InputGrow = () => (
  <InputButton label="Grow the app's audience">
    <div className="mr3">
      <Globe />
    </div>
    <CommandText text="Grow" />
  </InputButton>
);

export default App;
