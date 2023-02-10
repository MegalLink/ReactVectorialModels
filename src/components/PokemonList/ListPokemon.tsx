import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { PokemonInfo } from '../../shared/interfaces/get-pokemons-response'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { Loading } from '../Loading/Loading'
import { useAppDispatch } from '../../store/store-hook'
import { dismissModal, setBasicModal } from '../../store/reducers/pokemon-reducer'
import { BasicModal } from '../../shared/interfaces/basic-modal'
import { getPokemonByUrl } from '../../store/reducers/pokemon-thunks'

interface ListPokemonProps {
  pokemonList: PokemonInfo[]
}

export default function ListPokemon({ pokemonList }: ListPokemonProps) {
  const dispatcher = useAppDispatch()
  if (pokemonList.length === 0) {
    return <Loading />
  }

  const handleClickAddIconButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    pokemon: PokemonInfo,
  ) => {
    event.preventDefault()
    const modal: BasicModal = {
      isOpen: true,
      handleClose: () => {},
      title: `Desea agregar ${pokemon.name}?`,
      primaryButton: {
        btnText: 'Aceptar',
        handleClick: () => {
          dispatcher(getPokemonByUrl(pokemon.url))
          dispatcher(dismissModal())
        },
      },
      secondaryButton: {
        btnText: 'Cancelar',
        handleClick: () => {
          dispatcher(dismissModal())
        },
      },
    }

    dispatcher(setBasicModal(modal))
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

  return <List>{listItems}</List>
}
