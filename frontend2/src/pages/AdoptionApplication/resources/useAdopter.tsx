import axios from 'axios'
import React from 'react'
import IMessageAttributes from '../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../components/MessagesComponent/Resources/MessagesList'
import { adopterDefault, errorAdopterDefault, IAdopter, IAdopterErrors } from './adopter'

export const useAdopter = (petId: string) => {
  const [adopter, setAdopter] = React.useState<IAdopter>(adopterDefault)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorsAdopter] = React.useState<IAdopterErrors>(errorAdopterDefault)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const handleOnClickButton = () => {
    axios
      .post(process.env.REACT_APP_API_URL + 'pets/' + petId + '/adopt', adopter)
      .then((response) => {
        setAlertMessage(messagesList.SUCCESS_CREATED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return { isLoading, adopter, setAdopter, errorsAdopter, handleOnClickButton, alertMessage }
}
