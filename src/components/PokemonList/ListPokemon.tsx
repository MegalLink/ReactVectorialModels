import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { PokemonInfo } from '../../interfaces/get-pokemons-response'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Loading from '../Loading/Loading'
import { useAppDispatch } from '../../store/store-hook'
import { getPokemonByUrl } from '../../store/reducers/pokemon-reducer'
interface ListPokemonProps {
  pokemonList: PokemonInfo[]
}

export default function ListPokemon({ pokemonList }: ListPokemonProps) {
  const dispatcher = useAppDispatch()
  if (pokemonList.length === 0) {
    return <Loading />
  }

  const listItems = pokemonList.map((pokemon: PokemonInfo) => (
    <ListItem key={pokemon.url}>
      <ListItemButton>
        <ListItemText>{pokemon.name}</ListItemText>
        <Stack direction='row' spacing={1}>
          <IconButton
            onClick={(e) => {
              handleClickAddIconButton(e, pokemon)
            }}
            color='primary'
            aria-label='add to shopping cart'
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </ListItemButton>
    </ListItem>
  ))

  const handleClickAddIconButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfo,
  ) => {
    event.preventDefault()
    dispatcher(getPokemonByUrl(pokemon.url))
  }

  return <List>{listItems}</List>
}
