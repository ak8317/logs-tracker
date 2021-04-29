import React, { Fragment, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import SearchBox from './components/layout/SearchBox';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import AddTechModal from './components/techs/AddTechModal';
import store from './store';
import { Provider } from 'react-redux';
import Logs from './components/logs/Logs';
import EditLogModal from './components/logs/EditLogModal';
import TechListModal from './components/techs/TechListModal';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Fragment>
        <SearchBox />
        <div className='div container'>
          <AddBtn />
          <AddLogModal />
          <AddTechModal />
          <EditLogModal />
          <TechListModal />
          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
