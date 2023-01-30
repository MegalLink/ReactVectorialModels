import { GetPokemonResponse } from "../../../interfaces/get-pokemon-response";

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCardPokemon } from "../../MyPokemon/CardPokemon/useCardPokemon";

interface CardPokemonProps {
  pokemon: GetPokemonResponse;
}

export default function CardPokemon({ pokemon }: CardPokemonProps) {
  const { handleDelete, handleUpdate } = useCardPokemon(pokemon);

  return (
    <Card>
      <CardMedia
        className=""
        style={{ objectFit: "contain" }}
        component="img"
        height="280"
        image={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleUpdate(pokemon.name)}>
          Modificar
        </Button>
        <Button size="small" onClick={handleDelete}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
