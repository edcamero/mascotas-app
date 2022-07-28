import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RequireAuth from '../pages/LoginPage/RequireAuth'

interface IRouterProps {
  children: JSX.Element | JSX.Element[]
}
const RouterApp: React.FC<IRouterProps> = (props) => {
  return (
    <>
      <header className="App-header">
        <BrowserRouter>
          {props.children}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/ingreso"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </header>
    </>
  )
}

export default RouterApp
