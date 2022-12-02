/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
import React from 'react'
import { ResponseMercadoPago } from './PayPet'
import { useEffect } from 'react'

const config = {
  headers: {
    Authorization: `Bearer TEST-133243029648864-120111-69cc9a8878e2c2dd6d1258c2a8cffe52-108587794`,
  },
}

export const usePayPet = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initPoint, setInitPoint] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [price, setPrice] = React.useState(5000)
  const [responsePay, setResponsePay] = React.useState<ResponseMercadoPago>()

  useEffect(() => {
    if (!isLoading && responsePay?.sandbox_init_point) {
      setInitPoint(responsePay?.sandbox_init_point)
      window.open(responsePay?.sandbox_init_point, '_blank')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, responsePay])

  const makePayment = () => {
    const donationRequest = {
      items: [
        {
          title: 'Donación para la Fundación Patitas',
          description: 'Con esta donación ayudas muchas vidas. Gracias por tu ayuda',
          picture_url: '',
          category_id: 'donations',
          quantity: 1,
          unit_price: Number(price),
        },
      ],
      back_urls: {},
    }
    axios
      .post('https://api.mercadopago.com/checkout/preferences', donationRequest, config)
      .then((response) => {
        setResponsePay(response.data as ResponseMercadoPago)
      })
      .catch((error) => {
        setError('Error al realizar el pago')
      })
      .finally(() => setIsLoading(false))
  }

  return { makePayment, price, setPrice, error }
}
