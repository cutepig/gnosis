import * as React from 'react';
import * as cx from 'classnames';
import Typist from 'react-typist';
import {Camera, Mic, Globe} from 'react-feather';
import {Subscribe, Container} from 'unstated';

import 'gnosis/css/Typist.css';
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
    command: ECommand.Intro,
  };

  public issueCommand(command: ECommand) {
    this.setState({command});
  }

  // TODO: capturePhoto, etc.
}

interface ICommand {
  render: {
    intro: () => React.ReactElement<{}>;
    record: () => React.ReactElement<{}>;
    capture: () => React.ReactElement<{}>;
    processAudio: () => React.ReactElement<{}>;
    processPhoto: () => React.ReactElement<{}>;
    grow: () => React.ReactElement<{}>;
    default: () => React.ReactElement<{}>;
  };
}

const Command: React.StatelessComponent<ICommand> = ({render}) => (
  <div className="ph5 pv7 tc">
    <Subscribe to={[CommandContainer]}>
      {(command: CommandContainer) => {
        switch (command.state.command) {
          case ECommand.Intro:
            return render.intro();
          case ECommand.Record:
            return render.record();
          case ECommand.Capture:
            return render.capture();
          case ECommand.ProcessAudio:
            return render.processAudio();
          case ECommand.ProcessPhoto:
            return render.processPhoto();
          case ECommand.Grow:
            return render.grow();
          default:
            return render.default();
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
            return <InputBegin />;
          case ECommand.Record:
            return <InputMicrophone />;
          case ECommand.Capture:
            return <InputCamera />;
          case ECommand.ProcessAudio:
            return <InputText label="What do you hear?" placeholder="..." />;
          case ECommand.ProcessPhoto:
            return <InputText label="What do you see?" placeholder="..." />;
          case ECommand.Grow:
            return <InputGrow />;
          default:
            return null;
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
            <Command
              render={{
                intro: () => <CommandText id="1" text="Welcome to Gnosis." />,
                record: () => <CommandText id="2" text="Be our ears." />,
                capture: () => <CommandText id="3" text="Be our eyes." />,
                processAudio: () => <CommandText id="4" text="What do you hear?" />,
                processPhoto: () => <CommandText id="5" text="What do you see?" />,
                grow: () => <CommandText id="6" text="All will be part of Gnosis." />,
                default: () => <CommandText id="7" text="Welcome to Gnosis." />,
              }}
            />
            <CommandInput />
            <div className="pt6 w5 center">
              <p className="f5 lh-copy mt0 mb3 tc">God mode: active</p>
              <DebugView />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const DebugView = () => (
  <Subscribe to={[CommandContainer]}>
    {(command: CommandContainer) => (
      <ul className="DebugView list pl0 flex flex-row flex-wrap justify-center items-center">
        {mapEnum(ECommand, c => (
          <li key={c} className="mr2 w2">
            <InputButton label={c} onClick={() => command.issueCommand(c)}>
              X
            </InputButton>
          </li>
        ))}
      </ul>
    )}
  </Subscribe>
);

interface ICommandText {
  text: string;
  id?: string;
}

const CommandText: React.StatelessComponent<ICommandText> = ({text, id}) => (
  <p className="f5 mv0 b lh-copy courier">
    <Typist key={id}>{text}</Typist>
  </p>
);

const ActionText: React.StatelessComponent<ICommandText> = ({text}) => (
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

const InputText: React.StatelessComponent<IInput> = ({children, placeholder, label, cls}) => (
  <input
    aria-label={label}
    placeholder={placeholder}
    className={cx(
      'input-reset db center pa3 bg-transparent bn bb b--near-black hover-b--red transition-border near-black tc',
      cls,
    )}
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
      'w-100 input-reset pa3 ba b--near-black hover-b--red transition-border flex flex-row justify-center items-center',
      cls,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const InputCamera = () => (
  <label className="FileContainer w-100 input-reset pa3 ba b--near-black hover-b--red transition-border flex flex-row justify-center items-center">
    <div className="mr3">
      <Camera />
    </div>
    <input type="file" accept="image/*" />
    <ActionText text="Capture" />
  </label>
);

const InputMicrophone = () => (
  <label className="FileContainer w-100 input-reset pa3 ba b--near-black hover-b--red transition-border flex flex-row justify-center items-center">
    <div className="mr3">
      <Mic />
    </div>
    <input type="file" accept="audio/*" />
    <ActionText text="Record" />
  </label>
);

const InputGrow = () => (
  <InputButton label="Grow the app's audience">
    <div className="mr3">
      <Globe />
    </div>
    <ActionText text="Grow" />
  </InputButton>
);

const InputBegin = () => (
  <InputButton label="Sign up for Gnosis">
    <ActionText text="Begin" />
  </InputButton>
);

// Enum mapping
// @see: https://stackoverflow.com/questions/41308123/map-typescript-enum
// you can't use "enum" as a type, so use this.
interface IEnum {
  [s: number]: string;
}

function mapEnum(enumerable: IEnum, fn: (e: any) => any): any[] {
  // get all the members of the enum
  const enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key]);

  // we are only interested in the numeric identifiers as these represent the values
  const enumValues: number[] = enumMembers.filter(v => typeof v === 'number');

  // now map through the enum values
  return enumValues.map(m => fn(m));
}

export default App;
