import React from 'react'
import IMessageAttributes from '../../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../../components/MessagesComponent/Resources/MessagesList'
import useAxios from '../../../../services/axios.services'
import { INewUser, userDefault } from './userData'

export const UseUserUpdate = (
  userId: string,
  setAlertMessage: (value: IMessageAttributes) => void
) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false)
  const [userFormAttributes, setUserFormAttributes] = React.useState<INewUser>(userDefault)
  const { axios } = useAxios()

  React.useEffect(() => {
    if (isLoading) {
      axios
        .get(process.env.REACT_APP_API_URL + 'admin/species/' + userId)
        .then((response) => setUserFormAttributes(response.data as INewUser))
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const clickFormUser = () => {
    setIsLoadingUpdate(true)
    setAlertMessage(messageAttributes)
    axios
      .put(process.env.REACT_APP_API_URL + 'admin/species/' + userId, userFormAttributes)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_UPDATED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoadingUpdate(false))
  }
  const isLoadingAll = isLoading || isLoadingUpdate
  return { isLoadingAll, clickFormUser, userFormAttributes, setUserFormAttributes }
}
