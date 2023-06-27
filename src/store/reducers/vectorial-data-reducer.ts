import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TabEnum } from '../../shared/enums/tab'
import { PreparedVectorialData } from '../../shared/utils/transformations'

interface OutputData {
  modelResult: number[]
}

interface VectorialDataAppState {
  inputData: PreparedVectorialData
  tab:TabEnum,
  outputData: OutputData
}

export const initialState: VectorialDataAppState = {
  inputData: {
    vocabulary:[],
    queryWeight: [],
    documentsWeigth:[],
  },
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
    setTab(state, action) {
      state.tab = action.payload
    },
  },
})

export const { setInputData,setTab } = vectorialData.actions
export default vectorialData.reducer
