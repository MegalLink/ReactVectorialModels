import { configureStore } from '@reduxjs/toolkit';
import pokemomReducer from './reducers/pokemon-reducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
  reducer: {
    pokemon: pokemomReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
