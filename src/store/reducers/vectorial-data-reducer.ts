import { createSlice } from '@reduxjs/toolkit'
import { TabEnum } from '../../shared/enums/tab'
import { MethodResults, PreparedVectorialData } from '../../shared/utils/transformations'

interface VectorialDataAppState {
  inputData: PreparedVectorialData
  tab: TabEnum
  outputData: MethodResults
}

export const initialState: VectorialDataAppState = {
  inputData: {
    vocabulary: [],
    queryWeight: [],
    documentsWeigth: [],
  },
  tab: TabEnum.INPUT,
  outputData: {
    weightMatrix: [],
    result:[],
    time: 0,
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
    setOutputData(state, action) {
      state.outputData = action.payload
    },
  },
})

export const { setInputData, setTab, setOutputData } = vectorialData.actions
export default vectorialData.reducer
