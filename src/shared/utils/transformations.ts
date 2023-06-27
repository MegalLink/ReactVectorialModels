import { isEmpty } from "lodash";
import { VectorialMethodEnum } from "../enums/vectorial-methods";

export interface PreparedVectorialData{
    vocabulary:string[];
    queryWeight: number[];
    documentsWeigth: number[][];
}

export function prepareDocumentsFromString(documents:string,documentsSeparator:string,wordSeparator:string):string[][]{
    const documentsArray:string[]=prepareStringToArray(documents,documentsSeparator).filter(Boolean)
    const docs:string[][] = documentsArray.map((document) => prepareStringToArray(document, wordSeparator));

    return docs
}

export function vectorialModelPrepare(
    docs: string[][],
    query: string[],
    stopWords: string[] = []
  ): PreparedVectorialData {
    console.log('For query:', query);
    console.log('Stop words', stopWords);
    const filteredDocuments = docs.map((document) => {
      return document.filter((word) => {
        return !stopWords.includes(word.toLowerCase().trim());
      });
    });
  
    console.log('documents', filteredDocuments);
  
    const wordsMap = new Map<string, number>();
    const n = filteredDocuments.length;
    for (let i = 0; i < n; i++) {
      const m = filteredDocuments[i].length;
      for (let j = 0; j < m; j++) {
        if (!wordsMap.has(filteredDocuments[i][j])) {
          wordsMap.set(filteredDocuments[i][j], 0);
        }
        wordsMap.set(
          filteredDocuments[i][j],
          wordsMap.get(filteredDocuments[i][j])! + 1
        );
      }
    }
  
    const keys = Array.from(wordsMap.keys());
    console.log('Keys', keys);
  
    const documentsToWeigth = filteredDocuments.map((row) => {
      return toWeightConverter(row, wordsMap);
    });
    console.log('documents with weight', documentsToWeigth);
  
    const queryToWeigth = toWeightConverter(query, wordsMap);
  
    return { vocabulary:keys, queryWeight: queryToWeigth, documentsWeigth: documentsToWeigth };
  }
  
  export  function prepareStringToArray(input: string |undefined, separator: string): string[] {
    if (isEmpty(input)){
        return []
    }
    return input!.split(separator).map((word) => word.toLowerCase().trim());
  }
  
  function toWeightConverter(
    input: string[],
    wordsMap: Map<string, number>
  ): number[] {
    const keys = Array.from(wordsMap.keys());
    const documentWeight: number[] = keys.map((key) =>
      input.reduce((count, value) => (value === key ? count + 1 : count), 0)
    );
  
    return documentWeight;
  }
  
  function transformToOnesMatrix(m: number[][]): number[][] {
    return m.map((row) => row.map((value) => (value > 1 ? 1 : value)));
  }
  
export function similitud1(queryWeight: number[], documentsWeigth: number[][]) {
    console.log('Result for method simple');
    const onesDocumentWeight = transformToOnesMatrix(documentsWeigth);
  
    for (let i = 0; i < onesDocumentWeight.length; i++) {
      let total = 0;
      for (let j = 0; j < queryWeight.length; j++) {
        total += queryWeight[j] * onesDocumentWeight[i][j];
      }
  
      console.log('document:', i, 'similitud:', total);
    }
  }
  
 export function similitud2(queryWeight: number[], documentsWeigth: number[][]) {
    console.log('Result for method with document words length relevance');
    const onesDocumentWeight = transformToOnesMatrix(documentsWeigth);
    for (let i = 0; i < onesDocumentWeight.length; i++) {
      let qdi = 0;
      for (let j = 0; j < onesDocumentWeight.length; j++) {
        qdi += queryWeight[j] * onesDocumentWeight[i][j];
      }
  
      const wdi = onesDocumentWeight[i].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const total = qdi / wdi;
      console.log('document:', i, 'similitud:', total);
    }
  }
  
  function getModuleOfVector(array: number[]): number {
    const sum = array.reduce((a, b) => a + b * b, 0);
  
    return Math.sqrt(sum);
  }
  
 export function similitud3(queryWeight: number[], documentsWeigth: number[][]) {
    const mq = getModuleOfVector(queryWeight);
    const onesDocumentWeight = transformToOnesMatrix(documentsWeigth);
    console.log('Result for method with normalization');
    for (let i = 0; i < onesDocumentWeight.length; i++) {
      let qdi = 0;
      for (let j = 0; j < onesDocumentWeight.length; j++) {
        qdi += queryWeight[j] * onesDocumentWeight[i][j];
      }
      const mdi = getModuleOfVector(onesDocumentWeight[i]);
      const total = qdi / (mdi * mq);
      console.log('document:', i, 'similitud:', total);
    }
  }
  
  function calculateNi(documentsWeigth: number[][]): number[] {
    return documentsWeigth.reduce((acc, row) => {
      row.forEach((value, index) => {
        if (value !== 0) {
          acc[index] = (acc[index] || 0) + 1;
        }
      });
      return acc;
    }, []);
  }
  
 export function similitud4(queryWeight: number[], documentsWeigth: number[][]) {
    console.log('Result for method term value frequency idf');
    const N = documentsWeigth.length;
    const ni: number[] = calculateNi(documentsWeigth);
  
    const newWeights = documentsWeigth.map((document) => {
      return document.map((value, j) => {
        const idf = value * Math.log10(N / ni[j]);
  
        return idf;
      });
    });
  
    const mq = getModuleOfVector(queryWeight);
  
    for (let i = 0; i < newWeights.length; i++) {
      let qdi = 0;
      for (let j = 0; j < queryWeight.length; j++) {
        qdi += queryWeight[j] * newWeights[i][j];
      }
  
      const mdi = getModuleOfVector(newWeights[i]);
      const total = qdi / (mdi * mq);
      console.log('document:', i, 'similitud:', total);
    }
  }
  
  function sumColumns(matrix: number[][]): number[] {
    const columnSums: number[] = Array(matrix[0].length).fill(0);
    for (const row of matrix) {
      for (let i = 0; i < row.length; i++) {
        columnSums[i] += row[i];
      }
    }
    return columnSums;
  }
  
  function filterAndSumMatrixColumns(
    matrix: number[][],
    filterRowsIndex: number[]
  ): number[] {
    const relevantDocuments: number[][] = [];
    for (const i of filterRowsIndex) {
      relevantDocuments.push(matrix[i]);
    }
    return sumColumns(relevantDocuments);
  }
  
  function biggestNumbersOfArrayIndex(array: number[], R: number): number[] {
    const result: number[] = [];
    let largestIndices: number[] = [];
  
    for (let i = 0; i < array.length; i++) {
      if (largestIndices.length < R) {
        largestIndices.push(i);
      } else {
        const smallestIndex = largestIndices.reduce((prevIndex, currentIndex) =>
          array[prevIndex] < array[currentIndex] ? prevIndex : currentIndex
        );
        if (array[i] > array[smallestIndex]) {
          largestIndices = largestIndices.filter(
            (index) => index !== smallestIndex
          );
          largestIndices.push(i);
        }
      }
    }
  
    result.push(...largestIndices);
  
    return result.sort();
  }
  
 export function similitud5(
    queryWeight: number[],
    documentsWeigth: number[][],
    r: number
  ) {
    console.log('Result for probabilistic method');
    console.log('query', queryWeight);
    console.log('document', documentsWeigth);
    const numberOfDocuments = documentsWeigth.length;
    const ni: number[] = calculateNi(documentsWeigth);
    const ciInitial = ni.map((n) => Math.log10((numberOfDocuments - n) / n));
    const ciSimInitial = documentsWeigth.map((document) => {
      return document.reduce(
        (sum, docItem, j) => sum + queryWeight[j] * ciInitial[j] * docItem,
        0
      );
    });
    console.log('ciInitial', ciInitial);
    console.log('simInitial', ciSimInitial);
  
    // Extract the indices of the R largest numbers
    const indexRelevantDocuments: number[] = biggestNumbersOfArrayIndex(
      ciSimInitial,
      r
    );
  
    console.log('index relevant documents', indexRelevantDocuments);
  
    const numberRelevantDocuments: number = indexRelevantDocuments.length;
  
    const ri = filterAndSumMatrixColumns(documentsWeigth, indexRelevantDocuments);
    const ci: number[] = [];
  
    for (let i = 0; i < queryWeight.length; i++) {
      const a = ri[i] + 0.5;
      const b = numberRelevantDocuments - ri[i] + 0.5;
      const c = ni[i] - ri[i] + 0.5;
      const d = numberOfDocuments - numberRelevantDocuments - ni[i] + ri[i] + 0.5;
  
      const divideOp = a / b / (c / d);
      const result = Math.log10(divideOp);
  
      ci.push(result);
    }
  
    console.log('ci final', ci);
    const ciSimFinal = documentsWeigth.map((document) => {
      return document.reduce(
        (sum, docItem, j) => sum + queryWeight[j] * docItem * Number(ci[j]),
        0
      );
    });
  
    console.log('Similitud', ciSimFinal);
  }