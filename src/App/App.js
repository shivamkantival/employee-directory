import React, {PureComponent} from 'react';

//styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'react-select/dist/react-select.css';
import s from './App.mod.scss';

//components
import AppHeader from 'components/molecules/AppHeader';
import ActionBar from 'components/molecules/ActionBar';
import EmployessDetailsContainer from 'components/organisms/EmployeeCardsContainer';


export default class App extends PureComponent {
	
  render() {
    return (<div className={s.appContainer}>
      <div className={s.appBody}>
        <AppHeader/>
        <ActionBar/>
        <EmployessDetailsContainer />
      </div>
		</div>)
  }
	
}