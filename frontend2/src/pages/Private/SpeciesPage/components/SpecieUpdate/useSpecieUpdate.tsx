import React from 'react'
import useAxios from '../../../../../services/axios.services'
import { INewSpecie, specieInitial } from '../../resource/speciesResource'

export const UseSpecieUpdate = (specieId: string) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false)
  const [specieFormAttributes, setSpecieFormAttributes] = React.useState<INewSpecie>(specieInitial)
  const { axios } = useAxios()

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/species/' + specieId)
        .then((response) => setSpecieFormAttributes(response.data as INewSpecie))
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((error) => {})
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const clickFormSpecie = () => {
    setIsLoadingUpdate(true)
    axios
      .put(process.env.REACT_APP_API_URL + 'admin/species/' + specieId, specieFormAttributes)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((response) => {})
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {})
      .finally(() => setIsLoadingUpdate(false))
  }
  const isLoadingAll = isLoading || isLoadingUpdate
  return { isLoadingAll, clickFormSpecie, specieFormAttributes, setSpecieFormAttributes }
}
