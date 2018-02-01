import React, {PureComponent} from 'react';

//styles
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'react-select/dist/react-select.css';
import s from './App.mod.scss';

//components
import AppHeader from 'components/molecules/AppHeader';
import ActionBar from 'components/molecules/ActionBar';
import UserDetailsContainer from 'components/organisms/UserCardsContainer';
import NotificationService from 'components/organisms/NotificationService';


export default class App extends PureComponent {
	
  render() {
    return (<div className={classnames(s.appContainer, 'pos-rel')}>
      <div className={s.appBody}>
        <AppHeader/>
        <ActionBar/>
        <UserDetailsContainer />
      </div>
      <NotificationService/>
		</div>)
  }
	
}