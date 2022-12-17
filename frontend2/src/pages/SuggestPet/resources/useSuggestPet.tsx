import axios from 'axios'
import React from 'react'
import IMessageAttributes from '../../../components/MessagesComponent/Resources/IMessageAttributes'
import messageAttributes from '../../../components/MessagesComponent/Resources/MessageAttributes'
import messagesList from '../../../components/MessagesComponent/Resources/MessagesList'
import { IPets, petDetailsInitial } from '../../Private/PetsPage/resource/usePets'
import {
  ISuggestPet,
  ISuggestPetError,
  SuggestPetDefault,
  SuggestPetErrorDefault,
} from './suggestPet'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSuggestPet = () => {
  const navigate = useNavigate()
  const [suggest, setSuggest] = React.useState<ISuggestPet>(SuggestPetDefault)
  const [isLoading, setIsLoading] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorsSuggest, setErrorsSuggest] = React.useState<ISuggestPetError>(SuggestPetErrorDefault)
  const [petDetails, setDetails] = React.useState<IPets>(petDetailsInitial)

  useEffect(() => {
    if (petDetails.ID !== '') {
      navigate(`/pets/${petDetails.ID}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petDetails.ID])

  const handleOnClickButton = () => {
    axios
      .post(process.env.REACT_APP_API_URL + 'pets/clue', suggest)
      .then((response) => {
        setDetails(response.data as IPets)
        setAlertMessage(messagesList.SUCCESS_CREATED)
      })
      .catch((error) => {
        setAlertMessage(messagesList.INTERNAL_ERROR)
      })
      .finally(() => setIsLoading(false))
  }

  return { isLoading, suggest, setSuggest, errorsSuggest, handleOnClickButton, alertMessage }
}
