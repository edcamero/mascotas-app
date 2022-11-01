import React from 'react'
import IMessageAttributes from '../../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messagesList from '../../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../../services/axios.services'
import { IPets, petDetailsInitial } from '../../resource/usePets'

export const UsePetView = (
  specieId: string,
  setAlertMessage: (value: IMessageAttributes) => void
) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [petDetails, setDetails] = React.useState<IPets>(petDetailsInitial)
  const { axios } = useAxios()

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/pets/' + specieId)
        .then((response) => setDetails(response.data as IPets))
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return { isLoading, petDetails }
}
