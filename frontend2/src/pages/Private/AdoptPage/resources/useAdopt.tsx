import React from 'react'
import IMessageAttributes from '../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messagesList from '../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../services/axios.services'
import { adoptViewDefault, IAdoptViewsApi } from './adoptData'

export const UseAdopt = (petId: string, setAlertMessage: (value: IMessageAttributes) => void) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [adoptDetails, setAdoptDetails] = React.useState<IAdoptViewsApi>(adoptViewDefault)
  const { axios } = useAxios()

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/adopts/' + petId)
        .then((response) => setAdoptDetails(response.data as IAdoptViewsApi))
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return { isLoading, adoptDetails }
}
