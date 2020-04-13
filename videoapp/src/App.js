import React from 'react';
import './App.css';
import Header from './components/Header';
import ListFiles from './components/ListFiles';
import CrashComponent from './components/CrashComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <CrashComponent />
      <ListFiles />
    </div>
  );
}

export default App;
