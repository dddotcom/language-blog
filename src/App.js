import React from 'react';
import { TagalogContextProvider } from './contexts/TagalogContext';
import { VocabPractice } from './components/VocabPractice';
import { Home } from './components/Home';
import { VocabList } from './components/VocabList';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="">
      <TagalogContextProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/practice' component={VocabPractice} />
            <Route path='/list' component={VocabList} />
          </Switch>
      </TagalogContextProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
