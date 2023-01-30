import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import { useAppSelector } from "../../store/store-hook";
import { GetPokemonResponse } from "../../interfaces/get-pokemon-response";
import CardPokemon from "./CardPokemon/CardPokemon";
import { useNavigate } from "react-router-dom";

interface AccordionPokemonProps {
  pokemons: GetPokemonResponse[];
}

function AccordionPokemon({ pokemons }: AccordionPokemonProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (pokemons.length === 0) {
    return <Typography sx={{ width: "100%" }}>Add a pokemon :D</Typography>;
  }

  const accordionList = pokemons.map((pokemon) => {
    return (
      <Accordion
        key={pokemon.id}
        expanded={expanded === pokemon.name + pokemon.id}
        onChange={handleChange(pokemon.name + pokemon.id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${pokemon.name}-content`}
          id={`panel-${pokemon.name}-header`}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {pokemon.name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>{pokemon.id}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
          <CardPokemon pokemon={pokemon} />
        </AccordionDetails>
      </Accordion>
    );
  });

  return <>{accordionList}</>;
}

export default function MyPokemonsAccordion() {
  const { savedPokemons } = useAppSelector((store) => store.pokemon);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Stack direction="row" spacing={2} sx={{ pb: "10px" }}>
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={() => {
            navigate("create");
          }}
          startIcon={<CreateIcon />}
        >
          Create own pokemon
        </Button>
      </Stack>
      <AccordionPokemon pokemons={savedPokemons} />
    </React.Fragment>
  );
}
