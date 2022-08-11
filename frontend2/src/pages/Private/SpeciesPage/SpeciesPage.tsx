import React from 'react'
import { Route } from 'react-router-dom'
import SpecieTableComponent from './components/SpecieTable/SpecieTableComponent'

const SpeciesPage = () => {
  return <Route path="/" element={<SpecieTableComponent />} />
}

export default SpeciesPage
