import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'

import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useCardPokemon } from './hooks/useCardPokemon'

interface CardPokemonProps {
  pokemon: GetPokemonResponse
}

export function CardPokemon({ pokemon }: CardPokemonProps) {
  const { actions } = useCardPokemon(pokemon)

  return (
    <Card>
      <CardMedia
        className=''
        style={{ objectFit: 'contain' }}
        component='img'
        height='280'
        image={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {pokemon.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => actions.handleUpdate(pokemon.name)}>
          Modificar
        </Button>
        <Button size='small' onClick={() => actions.handleDelete()}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}
