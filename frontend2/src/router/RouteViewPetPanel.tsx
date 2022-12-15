import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HistoryPet from '../pages/Private/PetsPage/components/PetView/component/history/HistoryPet.component'
import ImageUdpload from '../pages/Private/PetsPage/components/PetView/component/image/ImageUdpload.component'
import ImageView from '../pages/Private/PetsPage/components/PetView/component/image/ImageView.component'
import AgregarPeso from '../pages/Private/PetsPage/components/PetView/component/peso/components/AgregarPeso.component'
import PesoPet from '../pages/Private/PetsPage/components/PetView/component/peso/PesoPet.component'
import Vacune from '../pages/Private/PetsPage/components/PetView/component/vacune/Vacune.component'

const RouteViewPetPanel: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ImageView />} />
        <Route path="image/udpload" element={<ImageUdpload />} />
        <Route path="vacune" element={<Vacune />} />
        <Route path="peso">
          <Route path="" element={<PesoPet />} />
          <Route path="add" element={<AgregarPeso />} />
        </Route>

        <Route path="history" element={<HistoryPet />} />
      </Route>
    </Routes>
  )
}

export default RouteViewPetPanel
