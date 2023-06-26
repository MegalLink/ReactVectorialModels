import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TabEnum } from '../../shared/enums/tab'

export interface InputData {
  documents: string[][]
  query: string[]
  stopWords?: string[]
  vocabulary?: string[]
}

interface OutputData {
  modelResult: number[]
}

interface VectorialDataAppState {
  inputData: InputData
  validateInputData:boolean,
  tab:TabEnum,
  outputData: OutputData
}

export const initialState: VectorialDataAppState = {
  inputData: {
    documents: [],
    query: [],
  },
  validateInputData:false,
  tab:TabEnum.INPUT,
  outputData: {
    modelResult: [],
  },
}

const vectorialData = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setInputData(state, action) {
      state.inputData = action.payload
    },
    setValidateInputData(state, action) {
      state.validateInputData = action.payload
    },
    setTab(state, action) {
      state.tab = action.payload
    },
  },
})

export const { setInputData,setValidateInputData,setTab } = vectorialData.actions
export default vectorialData.reducer
