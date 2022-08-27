import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './Routes/index'
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout'
import styled from 'styled-components'
import 'antd/dist/antd.css'

import { Connect2ICProvider, ConnectDialog } from '@connect2ic/react'
import { createClient } from '@connect2ic/core'
import { PlugWallet } from '@connect2ic/core/providers/plug-wallet'
import { canisterId } from '../../declarations/final_be/index.js'
import { idlFactory } from '../../declarations/final_be/final_be.did.js'
import Provider from './hooks/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalStyle from './Layouts/GlobalStyle/index'

const canisterDefinitions = {
  superheroes: { idlFactory, canisterId },
}
const client = createClient({
  canisters: canisterDefinitions,
  providers: [new PlugWallet()],
})

function App() {
  return (
    <Router>
      <Connect2ICProvider client={client}>
        <GlobalStyle>
          <Provider>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = DefaultLayout
                const Page = route.component
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })}
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Provider>
        </GlobalStyle>
      </Connect2ICProvider>
    </Router>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
