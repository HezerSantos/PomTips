import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import api from './app.config'
import useGlobalContext from './customHooks/useGlobalContext'
import GlobalError from './components/errors/globalError'
import { AxiosError } from 'axios'
import Error500 from './pages/errors/error500'
function App() {
  const globalContext = useGlobalContext()
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    if (import.meta.env.MODE === 'production') {
      console.warn = () => {}
      console.error = () => {}
      console.info = () => {}
      console.debug = () => {}
    }
  }, [])

  useEffect(() => {
    const getCredentials = async() => {
      try{
        await api.get(`/api/auth/public`)
        await api.get(`/api/csrf`)
        globalContext.csrf?.decodeCookie("__Secure-auth.csrf")
        setIsLoading(false)
      } catch(e){
        const axiosError = e as AxiosError
        if(axiosError.code === "ERR_NETWORK" || axiosError.code === "ERR_CONNECTION_REFUSED"){
          globalContext.error?.setError({isError: true, status: 500})
        }
      }
    }

    getCredentials()
  }, [])

  if(globalContext.error?.error.isError && globalContext.error?.error.status === 500){
    return <Error500 />
  }
  return (
    <>
      {!isLoading && (
        <>
          {globalContext.error?.error.isError && <GlobalError /> }
          <Outlet />
        </>
      )}
    </>
  )
}

export default App