import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './Routes/index'
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout'

import styled from 'styled-components'

import { Connect2ICProvider, ConnectDialog } from '@connect2ic/react'
import { createClient } from '@connect2ic/core'
import { PlugWallet } from '@connect2ic/core/providers/plug-wallet'
import { canisterId } from '../../declarations/final_be/index.js'
import { idlFactory } from '../../declarations/final_be/final_be.did.js'
import Provider from './hooks/index'

const canisterDefinitions = {
  superheroes: { idlFactory, canisterId },
}
const client = createClient({
  canisters: canisterDefinitions,
  providers: [new PlugWallet()],
})

function App() {
  return (
    <Connect2ICProvider client={client}>
      <Router>
        <Provider>
          <Container>
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
            <ConnectDialog className="wallet_dialog" />
          </Container>
        </Provider>
      </Router>
    </Connect2ICProvider>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

const Container = styled.div`
  .dialog-styles {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background-color: #fff;
      padding: 35px;
      border-radius: 10px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
`
