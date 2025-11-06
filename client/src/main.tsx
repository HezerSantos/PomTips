import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import routes from './routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorProvider from './context/error/errorProvider.js'
import CsrfProvider from './context/csrf/csrfProvider.js'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorProvider>
      <CsrfProvider>
        <RouterProvider router={router} />
      </CsrfProvider>
    </ErrorProvider>
  </StrictMode>
)