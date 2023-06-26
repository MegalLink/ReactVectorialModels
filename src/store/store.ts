import { configureStore } from '@reduxjs/toolkit'
import vectorialReducer from './reducers/vectorial-data-reducer'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
  reducer: {
    vectorialData: vectorialReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
