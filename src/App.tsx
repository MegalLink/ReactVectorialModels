import React, { useEffect } from 'react';
import './App.css';

import HorizontalTabs from './components/Tabs/HorizontalTab';
import Header from './components/Header/Header';
import { useAppDispatch } from './store/store-hook';
import { getPokemons } from './store/reducers/pokemon-reducer';

export default function App() {
  const dispatcher = useAppDispatch();
  useEffect(() => {
    //simulate timeout to see spiner :3
    setTimeout(() => dispatcher(getPokemons()), 2000);
  }, []);

  return (
    <div>
      <Header />
      <HorizontalTabs />
    </div>
  );
}