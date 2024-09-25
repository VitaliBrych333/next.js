import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/MoviesSlice';
import modalWindowReducer from './features/ModalWindowSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { moviesReducer, modalWindowReducer }
  });
}
  
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

