import React from 'react';
import { TagalogContextProvider } from './contexts/TagalogContext';
import { VocabPractice } from './components/VocabPractice';

function App() {
  return (
    <div className="">
      <TagalogContextProvider>
          <VocabPractice />
      </TagalogContextProvider>
    </div>
  );
}

export default App;
