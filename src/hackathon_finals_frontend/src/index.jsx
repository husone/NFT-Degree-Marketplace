import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './Routes/index'
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout'

function App() {
  return (
    <div>
      <Router>
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
      </Router>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
