import React from 'react';
import './App.css';
import MenuComponent from './components/menuComponent/MenuComponent';
import RouterApp from './router/RouterApp';

function App() {
  return (
    <div className='App'>
      <RouterApp>
        <MenuComponent />
      </RouterApp>
    </div>
  );
}

export default App;
