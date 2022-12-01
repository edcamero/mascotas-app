import axios from "axios"
import React from "react"
import IMessageAttributes from "../../../components/MessagesComponent/Resources/IMessageAttributes"
import messageAttributes from "../../../components/MessagesComponent/Resources/MessageAttributes"
import messagesList from "../../../components/MessagesComponent/Resources/MessagesList"
import { ISponsorPet, ISponsorPetError, sponsorDefault, sponsorDefaultErrors } from "./sponsorerPet"


export const useSponsorPet = (petId: string) => {
    const [sponsor, setSponsor] = React.useState<ISponsorPet>(sponsorDefault)
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorsSponsor, setErrorsSponsor] = React.useState<ISponsorPetError>(sponsorDefaultErrors)
    const [alertMessage, setAlertMessage] = React.useState<IMessageAttributes>(messageAttributes)
  
    const regex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  
    React.useEffect(() => {
      if (alertMessage.severity === 'success') {
        setSponsor(sponsorDefault)
      }
    }, [alertMessage])
  
    React.useEffect(() => {
      if (sponsor.email !== '' && !regex.test(sponsor.email)) {
        setErrorsSponsor({
          ...errorsSponsor,
          email: 'Email no es valido',
        })
      } else {
        setErrorsSponsor({
          ...errorsSponsor,
          email: '',
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sponsor.email])
  
    const handleOnClickButton = () => {
      axios
        .post(process.env.REACT_APP_API_URL + 'pets/' + petId + '/adopt', sponsor)
        .then((response) => {
          setAlertMessage(messagesList.SUCCESS_CREATED)
        })
        .catch((error) => {
          setAlertMessage(messagesList.INTERNAL_ERROR)
        })
        .finally(() => setIsLoading(false))
    }
  
    return { isLoading, sponsor, setSponsor,  errorsSponsor, handleOnClickButton, alertMessage }
  }
  