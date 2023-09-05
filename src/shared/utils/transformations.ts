import { isEmpty } from 'lodash'
import { VectorialMethodEnum } from '../enums/vectorial-methods'

export interface PreparedVectorialData {
  vocabulary: string[]
  queryWeight: number[]
  documentsWeigth: number[][]
  originalDocuments: string[][]
}

export interface MethodResults {
  documentsWeight: number[][]
  queryWeight: number[]
  result: number[]
  realimentedResult?: number[]
  time: number
}

export function prepareDocumentsFromString(
  documents: string,
  documentsSeparator: string,
  wordSeparator: string,
): string[][] {
  const documentsArray: string[] = prepareStringToArray(documents, documentsSeparator).filter(
    Boolean,
  )
  const docs: string[][] = documentsArray.map((document) =>
    prepareStringToArray(document, wordSeparator),
  )

  return docs
}

export function vectorialModelPrepare(
  docs: string[][],
  query: string[],
  stopWords: string[] = [],
  vocabulary: string[] = [],
): PreparedVectorialData {
  // Filtramos los documentos eliminando las stop words
  const filteredDocuments = docs.map((document) => {
    return document.filter((word) => {
      return !stopWords.includes(word.toLowerCase().trim())
    })
  })

  // Si el vocabulario no esta vacio calculamos un vocabulario a partir de los documentos
  let keys: string[] = vocabulary
  if (keys.length === 0) {
    const wordsMap = new Map<string, number>()
    const n = filteredDocuments.length
    for (let i = 0; i < n; i++) {
      const m = filteredDocuments[i].length
      for (let j = 0; j < m; j++) {
        if (!wordsMap.has(filteredDocuments[i][j])) {
          wordsMap.set(filteredDocuments[i][j], 0)
        }
        wordsMap.set(filteredDocuments[i][j], wordsMap.get(filteredDocuments[i][j])! + 1)
      }
    }
    keys = Array.from(wordsMap.keys())
  }
  keys = keys.sort()

  const documentsToWeigth = filteredDocuments.map((row) => {
    return toWeightConverter(row, keys)
  })
  console.log('documents with weight', documentsToWeigth)

  const queryToWeigth = toWeightConverter(query, keys)

  return {
    vocabulary: keys,
    queryWeight: queryToWeigth,
    documentsWeigth: documentsToWeigth,
    originalDocuments: docs,
  }
}

export function prepareStringToArray(input: string | undefined, separator: string): string[] {
  if (isEmpty(input)) {
    return []
  }
  return input!.split(separator).map((word) => word.toLowerCase().trim())
}

function toWeightConverter(input: string[], keys: string[]): number[] {
  const documentWeight: number[] = keys.map((key) =>
    input.reduce((count, value) => (value === key ? count + 1 : count), 0),
  )

  return documentWeight
}

function transformToOnesMatrix(m: number[][]): number[][] {
  return m.map((row) => row.map((value) => (value > 1 ? 1 : value)))
}

export function similitud1(queryWeight: number[], documentsWeigth: number[][]): MethodResults {
  console.log('Result for method simple')
  const onesDocumentWeight = transformToOnesMatrix(documentsWeigth)
  const result = []
  for (let i = 0; i < onesDocumentWeight.length; i++) {
    let total = 0
    for (let j = 0; j < queryWeight.length; j++) {
      total += queryWeight[j] * onesDocumentWeight[i][j]
    }
    result.push(total)
    console.log('document:', i, 'similitud:', total)
  }
  console.log('result similitud1', result)

  return { documentsWeight: onesDocumentWeight, result: result, time: 0, queryWeight: queryWeight }
}

export function similitud2(queryWeight: number[], documentsWeigth: number[][]): MethodResults {
  console.log('Result for method with document words length relevance')
  const onesDocumentWeight = transformToOnesMatrix(documentsWeigth)
  const result = []
  for (let i = 0; i < onesDocumentWeight.length; i++) {
    let qdi = 0
    for (let j = 0; j < onesDocumentWeight.length; j++) {
      qdi += queryWeight[j] * onesDocumentWeight[i][j]
    }

    const wdi = onesDocumentWeight[i].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )
    const total = qdi / wdi
    result.push(total)
    console.log('document:', i, 'similitud:', total)
  }
  return { documentsWeight: onesDocumentWeight, result: result, time: 0, queryWeight: queryWeight }
}

function getModuleOfVector(array: number[]): number {
  const sum = array.reduce((a, b) => a + b * b, 0)

  return Math.sqrt(sum)
}

export function similitud3(queryWeight: number[], documentsWeigth: number[][]): MethodResults {
  const mq = getModuleOfVector(queryWeight)
  const onesDocumentWeight = transformToOnesMatrix(documentsWeigth)
  console.log('Result for method with normalization')
  const result = []
  for (let i = 0; i < onesDocumentWeight.length; i++) {
    let qdi = 0
    for (let j = 0; j < queryWeight.length; j++) {
      console.log('weight j', queryWeight[i])
      console.log('ones document weight', onesDocumentWeight[i][j])
      qdi += queryWeight[j] * onesDocumentWeight[i][j]
      console.log('QDI', qdi)
    }
    const mdi = getModuleOfVector(onesDocumentWeight[i])
    const total = qdi / (mdi * mq)
    result.push(total)
    console.log('document:', i, 'similitud:', total)
  }
  return { documentsWeight: onesDocumentWeight, result: result, time: 0, queryWeight: queryWeight }
}

function calculateNi(documentsWeigth: number[][]): number[] {
  return documentsWeigth.reduce((acc, row) => {
    row.forEach((value, index) => {
      if (value !== 0) {
        acc[index] = (acc[index] || 0) + 1
      }
    })
    return acc
  }, [])
}

export function similitud4(queryWeight: number[], documentsWeigth: number[][]): MethodResults {
  console.log('Result for method term value frequency idf')
  const N = documentsWeigth.length
  const ni: number[] = calculateNi(documentsWeigth)
  const result: number[] = []
  const newWeights = documentsWeigth.map((document) => {
    return document.map((value, j) => {
      const idf = value * Math.log10(N / ni[j])

      return idf
    })
  })

  const mq = getModuleOfVector(queryWeight)

  for (let i = 0; i < newWeights.length; i++) {
    let qdi = 0
    for (let j = 0; j < queryWeight.length; j++) {
      qdi += queryWeight[j] * newWeights[i][j]
    }

    const mdi = getModuleOfVector(newWeights[i])
    const total = qdi / (mdi * mq)
    result.push(total)
    console.log('document:', i, 'similitud:', total)
  }

  return { documentsWeight: newWeights, result: result, time: 0, queryWeight: queryWeight }
}

function sumColumns(matrix: number[][]): number[] {
  const columnSums: number[] = Array(matrix[0].length).fill(0)
  for (const row of matrix) {
    for (let i = 0; i < row.length; i++) {
      columnSums[i] += row[i]
    }
  }
  return columnSums
}

function filterAndSumMatrixColumns(matrix: number[][], filterRowsIndex: number[]): number[] {
  const relevantDocuments: number[][] = []
  for (const i of filterRowsIndex) {
    relevantDocuments.push(matrix[i])
  }
  return sumColumns(relevantDocuments)
}

function biggestNumbersOfArrayIndex(array: number[], R: number): number[] {
  const result: number[] = []
  let largestIndices: number[] = []

  for (let i = 0; i < array.length; i++) {
    if (largestIndices.length < R) {
      largestIndices.push(i)
    } else {
      const smallestIndex = largestIndices.reduce((prevIndex, currentIndex) =>
        array[prevIndex] < array[currentIndex] ? prevIndex : currentIndex,
      )
      if (array[i] > array[smallestIndex]) {
        largestIndices = largestIndices.filter((index) => index !== smallestIndex)
        largestIndices.push(i)
      }
    }
  }

  result.push(...largestIndices)

  return result.sort()
}

export function similitud5(
  queryWeight: number[],
  documentsWeigth: number[][],
  r: number,
): MethodResults {
  console.log('Result for probabilistic method')
  console.log('query', queryWeight)
  console.log('document', documentsWeigth)
  const numberOfDocuments = documentsWeigth.length
  const ni: number[] = calculateNi(documentsWeigth)
  console.log('ni', ni)
  const ciInitial: number[] = ni.map((n) => Math.log10((numberOfDocuments - n) / n))
  const ciSimInitial = documentsWeigth.map((document) => {
    return document.reduce((sum, docItem, j) => sum + queryWeight[j] * ciInitial[j] * docItem, 0)
  })
  console.log('ciInitial', ciInitial)
  console.log('simInitial', ciSimInitial)

  // Extract the indices of the R largest numbers but consider recalculate r if the are less result for sim initial if is small than R the rows diferent from 0
  const indexRelevantDocuments: number[] = biggestNumbersOfArrayIndex(ciSimInitial, r)

  console.log('index relevant documents', indexRelevantDocuments)

  const numberRelevantDocuments: number = indexRelevantDocuments.length

  const ri = filterAndSumMatrixColumns(documentsWeigth, indexRelevantDocuments)
  const ci: number[] = []

  for (let i = 0; i < queryWeight.length; i++) {
    console.log('i', i)
    const a = ri[i] + 0.5
    const b = numberRelevantDocuments - ri[i] + 0.5
    const c = ni[i] - ri[i] + 0.5
    const d = numberOfDocuments - numberRelevantDocuments - ni[i] + ri[i] + 0.5

    const divideOp = a / b / (c / d)
    console.log('DivideOP', divideOp)
    const result = Math.log10(divideOp)
    console.log('result mat op', result)
    if (isNaN(result)) {
      ci.push(0)
      break
    }
    ci.push(result)
  }

  console.log('ci final', ci)
  const ciSimFinal: number[] = documentsWeigth.map((document) => {
    return document.reduce((sum, docItem, j) => sum + queryWeight[j] * docItem * Number(ci[j]), 0)
  })

  console.log('Similitud', ciSimFinal)
  // TODO CONSIDER PRINT OTHER RESULTS
  return { documentsWeight: documentsWeigth, result: ciSimFinal, time: 0, queryWeight: queryWeight }
}

export function normalizeVector(v: number[]) {
  const module = getModuleOfVector(v)

  return v.map((value) => value / module)
}

export function relationDocumentsWithQuery(documentsWeight: number[][], queryWeight: number[]) {
  const mq = getModuleOfVector(queryWeight)
  const result: number[] = []
  for (let i = 0; i < documentsWeight.length; i++) {
    let qdi = 0
    for (let j = 0; j < queryWeight.length; j++) {
      qdi += queryWeight[j] * documentsWeight[i][j]
    }

    const mdi = getModuleOfVector(documentsWeight[i])
    const total = qdi / (mdi * mq)
    result.push(total)
  }
  return result
}

export function tfIDFNormalized(queryWeight: number[], documentsWeigth: number[][]): MethodResults {
  const N = documentsWeigth.length
  const ni: number[] = calculateNi(documentsWeigth)

  const idf = ni.map((niValue) => {
    return Math.log10(N / niValue)
  })

  const idfDocuments = documentsWeigth.map((document) => {
    return document.map((value, j) => {
      return value * idf[j]
    })
  })

  const idfq = queryWeight.map((value, j) => {
    return value * idf[j]
  })

  const documentsNormalized = idfDocuments.map((row) => normalizeVector(row))
  const queryNormalized = normalizeVector(idfq)
  const result = relationDocumentsWithQuery(documentsNormalized, queryNormalized)

  return {
    documentsWeight: documentsNormalized,
    queryWeight: queryNormalized,
    result: result,
    time: 0,
  }
}

function addMatrixRows(m: number[][]): number[] {
  const rowSum = []
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      const addValue: number = rowSum[j] === undefined ? 0 : rowSum[j]
      rowSum[j] = addValue + m[i][j]
    }
  }
  return rowSum
}

function rochio(
  result: MethodResults,
  relevantIndex: number[],
  noRelevantIndex: number[],
  alfa = 1,
  beta = 0.75,
  ro = 0.25,
): number[] {
  const relevantDocuments: number[][] = relevantIndex.map((index) => result.documentsWeight[index])
  const noRelevantDocuments: number[][] = noRelevantIndex.map(
    (index) => result.documentsWeight[index],
  )

  console.log('relevant documents', relevantDocuments)
  console.log('no relevant documents', noRelevantDocuments)

  const a: number[] = result.queryWeight.map((value) => value * alfa)
  const b: number[] = addMatrixRows(relevantDocuments).map(
    (row) => (beta / relevantDocuments.length) * row,
  )

  const c: number[] = addMatrixRows(noRelevantDocuments).map(
    (row) => (ro / noRelevantDocuments.length) * row * -1,
  )

  const rochioResult = addMatrixRows([a, b, c])

  return rochioResult.map((value) => (value < 0 ? 0 : value))
}

export function selectMethod(
  input: PreparedVectorialData,
  method: VectorialMethodEnum,
): MethodResults {
  const startTime = new Date().getTime()
  let result: MethodResults = { documentsWeight: [], result: [], time: 0, queryWeight: [] }

  switch (method) {
    case VectorialMethodEnum.BASIC:
      result = similitud1(input.queryWeight, input.documentsWeigth)
      break
    case VectorialMethodEnum.WORD_DOCUMENT_LENGTH:
      result = similitud2(input.queryWeight, input.documentsWeigth)
      break
    case VectorialMethodEnum.NORMALIZATION:
      result = similitud3(input.queryWeight, input.documentsWeigth)
      break
    case VectorialMethodEnum.TF_IDF:
      result = tfIDFNormalized(input.queryWeight, input.documentsWeigth)
      break
  }
  const endTime = new Date().getTime() - startTime

  return { ...result, time: endTime }
}

export function resultWithFeedback(
  result: MethodResults,
  relevantDocumentsIndex: number[],
  noRelevantDocumentsIndex: number[],
): MethodResults {
  // pesudo realimentacion
  const qPrime = rochio(result, relevantDocumentsIndex, noRelevantDocumentsIndex)
  console.log('prime2', qPrime)
  console.log('result first iteration', result)
  const realimentedResult = relationDocumentsWithQuery(result.documentsWeight, qPrime)

  console.log('similitud pseudo realimentacion', realimentedResult)
  return { ...result, result: realimentedResult }
}
