import React from 'react'
import { useParams } from 'react-router-dom'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import SpecieFormComponent from '../SpecieForm/SpecieFormComponent'
import { UseSpecieUpdate } from './useSpecieUpdate'

const titleForm = 'Formulario para la actualizar especies'

const SpecieUpdateComponent = () => {
  let { id } = useParams()
  const {
    isLoadingAll: isLoading,
    clickFormSpecie,
    specieFormAttributes,
    setSpecieFormAttributes,
  } = UseSpecieUpdate(id ?? '')

  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <SpecieFormComponent
        {...{ titleForm, specieFormAttributes, setSpecieFormAttributes, clickFormSpecie }}
      />
    </>
  )
}

export default SpecieUpdateComponent
