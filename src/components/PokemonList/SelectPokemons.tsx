import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListPokemon from './ListPokemon';
import { useAppSelector } from '../../store/store-hook';

export default function SelectPokemon() {
  const { pokemonsList } = useAppSelector((store) => {
    return store.pokemon;
  });

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <ListPokemon pokemonList={pokemonsList} />
      </nav>
      <Divider />
    </Box>
  );
}
