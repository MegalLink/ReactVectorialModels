import axios from '../../shared/utils/axios'
import { store } from '../store'
import { getPokemonByName, getPokemonByUrl, getPokemons } from './pokemon-thunks'

jest.mock('../../shared/utils/axios')
jest.mock('../../shared/utils/snack-bar')

describe('pokemon-thunk tests', () => {
  it('should call axios.get successfully when getPokemons thunk is called', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: {} })
    await store.dispatch(getPokemons())
    expect(axios.get).toBeCalled()
  })

  it('should call axios.get successfully when getPokemonByName thunk is called', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: {} })
    await store.dispatch(getPokemonByName('some-name'))
    expect(axios.get).toBeCalled()
  })

  it('should call axios.get successfully whsen getPokemonByUrl thunk is called', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: {} })
    await store.dispatch(getPokemonByUrl('some-url'))
    expect(axios.get).toBeCalled()
  })
})
