import React from 'react'
import BackDropLoadApi from '../../../../../components/backDropLoad/BackDropLoadApi'
import useAxios from '../../../../../services/axios.services'
import { INewSpecie, specieInitial } from '../../resource/speciesResource'
import SpecieFormComponent from '../SpecieForm/SpecieFormComponent'

const SpecieCreateComponent: React.FC = () => {
  const { axios } = useAxios()
  const [isLoading, setIsLoading] = React.useState(false)
  const titleForm = 'Formulario para la creación de especies'
  const [specieFormAttributes, setSpecieFormAttributes] = React.useState<INewSpecie>(specieInitial)

  const clickFormSpecie = () => {
    axios
      .post(process.env.REACT_APP_API_URL + 'admin/species', specieFormAttributes)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((response) => {})
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {})
      .finally(() => setIsLoading(false))
  }
  return (
    <>
      <BackDropLoadApi open={isLoading} />
      <SpecieFormComponent
        {...{ titleForm, specieFormAttributes, setSpecieFormAttributes, clickFormSpecie }}
      />
    </>
  )
}

export default SpecieCreateComponent
