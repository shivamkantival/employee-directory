import React, {PureComponent} from 'react';
import s from './App.scss';

export default class App extends PureComponent {
  render() {
    return (<div
      className={s.text}
    >hello boys</div>);
  }
}