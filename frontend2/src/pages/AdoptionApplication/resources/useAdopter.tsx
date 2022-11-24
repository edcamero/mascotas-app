import axios from 'axios'
import React from 'react'
import IMessageAttributes from '../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../components/MessagesComponent/Resources/MessagesList'
import { adopterDefault, errorAdopterDefault, IAdopter, IAdopterErrors } from './adopter'

export const useAdopter = (petId: string) => {
  const [adopter, setAdopter] = React.useState<IAdopter>(adopterDefault)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorsAdopter, setErrorsAdopter] = React.useState<IAdopterErrors>(errorAdopterDefault)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)

  const regex = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  React.useEffect(() => {
    if (alertMessage.severity === 'success') {
      setAdopter(adopterDefault)
    }
  }, [alertMessage])

  React.useEffect(() => {
    if (adopter.email !== '' && !regex.test(adopter.email)) {
      setErrorsAdopter({
        ...errorsAdopter,
        email: 'Email no es valido',
      })
    } else {
      setErrorsAdopter({
        ...errorsAdopter,
        email: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adopter.email])

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
