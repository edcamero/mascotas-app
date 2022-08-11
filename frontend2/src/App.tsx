import React from 'react'
import './App.css'
import MenuComponent from './components/menuComponent/MenuComponent'
import { AuthProvider } from './pages/LoginPage/AuthProvider'
import RouterApp from './router/RouterApp'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterApp>
          <MenuComponent />
        </RouterApp>
      </AuthProvider>
    </div>
  )
}

export default App
