import { defaultTo, isEmpty } from 'lodash'
import { useEffect } from 'react'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { defaultPokemon } from '../../../shared/constants/app-state'
import { GetPokemonResponse } from '../../../shared/interfaces/get-pokemon-response'
import { resetPokemonToEdit } from '../../../store/reducers/pokemon-reducer'
import { getPokemonByName } from '../../../store/reducers/pokemon-thunks'
import { useAppDispatch, useAppSelector } from '../../../store/store-hook'

export interface UsePokemonForm {
  methods: UseFormReturn<GetPokemonResponse, any>
  actions: {
    onSubmit: SubmitHandler<GetPokemonResponse>
  }
}

export const usePokemonForm = (): UsePokemonForm => {
  const { pokemonId } = useParams()
  const { pokemonToEdit } = useAppSelector((store) => store.pokemon)
  const dispatch = useAppDispatch()
  const methods = useForm<GetPokemonResponse>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: { ...defaultPokemon },
  })

  const onSubmit: SubmitHandler<GetPokemonResponse> = (data) => {
    console.log('Do something', data)
  }

  useEffect(() => {
    if (!isEmpty(pokemonId)) {
      dispatch(getPokemonByName(defaultTo(pokemonId, '')))
    }
  }, [])

  useEffect(() => {
    if (!isEmpty(pokemonToEdit) && pokemonToEdit !== defaultPokemon) {
      // in some cases is necesary to set manualy because mui gets bugged and cant detect the change , is just a visual bug, try removing this line to see the bug in this field in the form
      methods.setValue('name', pokemonToEdit.name)
      methods.reset(pokemonToEdit)
    }
  }, [pokemonToEdit])

  // on unmount
  useEffect(
    () => () => {
      // Important reset form on unmount, and reset store values
      dispatch(resetPokemonToEdit())
      methods.reset()
    },
    [],
  )

  return {
    methods,
    actions: {
      onSubmit,
    },
  }
}
