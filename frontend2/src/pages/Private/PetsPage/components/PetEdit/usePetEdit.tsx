import React from 'react'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../../services/axios.services'
import { IPetRegister, petInitial } from '../../resource/usePets'

export const usePetEdit = (petId: string, setAlertMessage: (value: IMessageAttributes) => void) => {
  const [isLoadingDownload, setIsLoadingDownload] = React.useState(true)
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false)
  const [petFormAttributes, setPetFormAttributes] = React.useState<IPetRegister>(petInitial)
  const { axios } = useAxios()

  React.useEffect(() => {
    if (isLoadingDownload) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/pets/' + petId)
        .then((response: { data: IPetRegister }) =>
          setPetFormAttributes(response.data as IPetRegister)
        )
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoadingDownload(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDownload])

  const clickFormPet = () => {
    setIsLoadingUpdate(true)
    axios
      .put(process.env.REACT_APP_API_URL + 'admin/pets', petFormAttributes)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_UPDATED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoadingUpdate(false))
  }

  const isLoading = isLoadingDownload || isLoadingUpdate

  return { isLoading, petFormAttributes, setPetFormAttributes, clickFormPet }
}
