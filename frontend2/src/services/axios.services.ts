import useLocalStorage from "@rehooks/local-storage"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { initialSecurityTokens, securityTokensLocalStorageKey } from "../pages/LoginPage/AuthProvider"

const useAxios = () => {
  const [securityTokens] = useLocalStorage(
    securityTokensLocalStorageKey,
    initialSecurityTokens
  )

  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers = { Authorization: `Bearer ${securityTokens.accessToken}` }
    return config
  }

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }

  axios.interceptors.request.use(onRequest, onRequestError
  )

  return { axios }
}

export default useAxios
