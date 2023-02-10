import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MainPage } from './pages/MainPage/MainPage'
import reportWebVitals from './reportWebVitals'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { APP_ROUTE } from './shared/constants/app-routes'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtil } from './shared/utils/snack-bar'
import { FormPokemonPage } from './pages/FormPokemonPage/FormPokemonPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
        <SnackbarUtil />
        <BrowserRouter>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path={APP_ROUTE.updatePokemon} element={<FormPokemonPage />} />
            <Route path={APP_ROUTE.createPokemon} element={<FormPokemonPage />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
