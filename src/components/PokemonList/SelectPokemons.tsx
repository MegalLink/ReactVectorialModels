import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListPokemon from './ListPokemon'
import { useAppDispatch, useAppSelector } from '../../store/store-hook'
import { getPokemons } from '../../store/reducers/pokemon-thunks'

export default function SelectPokemon() {
  const dispatcher = useAppDispatch()
  const { pokemonsList } = useAppSelector((store) => {
    return store.pokemon
  })

  useEffect(() => {
    // simulate timeout to see spiner :3
    setTimeout(() => dispatcher(getPokemons()), 2000)
  }, [])

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label='main mailbox folders'>
        <ListPokemon pokemonList={pokemonsList} />
      </nav>
      <Divider />
    </Box>
  )
}
