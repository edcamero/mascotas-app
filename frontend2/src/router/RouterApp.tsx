import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RequireAuth from '../pages/LoginPage/RequireAuth'
import SpecieCreateComponent from '../pages/Private/SpeciesPage/components/SpecieCreate/SpecieCreateComponent'
import SpecieTableComponent from '../pages/Private/SpeciesPage/components/SpecieTable/SpecieTableComponent'
import SpecieUpdateComponent from '../pages/Private/SpeciesPage/components/SpecieUpdate/SpecieUpdateComponent'
import PetsList from '../pages/Private/PetsPage/components/PetsList/PetsList.component'
import PestCreate from '../pages/Private/PetsPage/components/PetCreate/PestCreate.component'
import PetView from '../pages/Private/PetsPage/components/PetView/PetView.component'
import PetPublicDetails from '../pages/HomePage/conponents/PetPublicDetails/PetPublicDetails.component'
import AdoptionApplicationPage from '../pages/AdoptionApplication/AdoptionApplicationPage'
import AdoptList from '../pages/Private/AdoptPage/components/AdoptList/AdoptList.component'
import UserList from '../pages/Private/UserPage/components/UserList/UserList.component'
import UserEdit from '../pages/Private/UserPage/components/UsersEdit/UserEdit.component'
import UserCreate from '../pages/Private/UserPage/components/UserCreate/UserCreate.component'
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
            <Route path="/pets">
              <Route path=":id" element={<PetPublicDetails />} />
              <Route path=":id/adopt" element={<AdoptionApplicationPage />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/species">
              <Route
                path=""
                element={
                  <RequireAuth>
                    <SpecieTableComponent />
                  </RequireAuth>
                }
              />
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <SpecieCreateComponent />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <SpecieUpdateComponent />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/pets">
              <Route
                path=""
                element={
                  <RequireAuth>
                    <PetsList />
                  </RequireAuth>
                }
              />
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <PestCreate />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <SpecieUpdateComponent />
                  </RequireAuth>
                }
              />
              <Route
                path="view/:id"
                element={
                  <RequireAuth>
                    <PetView />
                  </RequireAuth>
                }
              />
              <Route
                path="view/:id/*"
                element={
                  <RequireAuth>
                    <PetView />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="adopt"
              element={
                <RequireAuth>
                  <AdoptList />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                path=""
                element={
                  <RequireAuth>
                    <UserList />
                  </RequireAuth>
                }
              />
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <UserCreate />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <UserEdit />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </>
  )
}

export default RouterApp
