import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Box, Button } from "@mui/material";
import SectionInformation from "../PokemonForm/SectionInformation";
import HeaderForm from "../PokemonForm/HeaderForm";
import { GetPokemonResponse } from "../../interfaces/get-pokemon-response";
import { defaultTo, isEmpty } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store-hook";
import {
  getPokemonByName,
  resetPokemonToEdit,
} from "../../store/reducers/pokemon-reducer";
import SectionStats from "./SectionStats";

const defaultPokemon: GetPokemonResponse = {
  height: 0,
  id: 0,
  name: "",
  weight: 0,
  sprites: { other: { dream_world: { front_default: "" } } },
  stats: [],
  types: [],
};

export default function PokemonForm() {
  const { pokemonId } = useParams();
  const { pokemonToEdit } = useAppSelector((store) => store.pokemon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<GetPokemonResponse>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: { ...defaultPokemon },
  });

  const onSubmit: SubmitHandler<GetPokemonResponse> = (data) => {
    console.log("Do something", data);
  };

  useEffect(() => {
    if (!isEmpty(pokemonId)) {
      console.log("POKEMON ID", pokemonId);
      dispatch(getPokemonByName(defaultTo(pokemonId, "")));
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(pokemonToEdit)) {
      console.log("POKEMON TO EDIT", pokemonToEdit);
      methods.reset(pokemonToEdit);
    }
  }, [pokemonToEdit]);

  // on unmount
  useEffect(
    () => () => {
      // Important reset form on unmount, and reset store values
      console.log("unmount");
      dispatch(resetPokemonToEdit());
      methods.reset();
    },
    []
  );
  return (
    <div>
      <FormProvider {...methods}>
        <HeaderForm title={"Create"} />
        <Box>
          <SectionInformation />
          <SectionStats />
          <Button
            type="button"
            variant="contained"
            sx={{ width: "100%", mt: "10px" }}
            color="primary"
            onClick={methods.handleSubmit(onSubmit)}
          >
            Crear/Editar
          </Button>
        </Box>
      </FormProvider>
    </div>
  );
}
