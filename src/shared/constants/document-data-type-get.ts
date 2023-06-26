import { DocumentDataType } from '../enums/document-data-type'

export const getLabelFromFile = (dataType: DocumentDataType): string => {
  switch (dataType) {
    case DocumentDataType.DOCUMENT:
      return 'Ingrese la coleccion de documentos'
    case DocumentDataType.QUERY:
      return 'Ingrese el query'
    case DocumentDataType.VOCABULARY:
      return 'Ingrese el vocabulario'
    case DocumentDataType.STOP_WORDS:
      return 'Ingrese los stop words'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getLabelFromFile'
  }
}

export const getTitle = (dataType: DocumentDataType): string => {
  switch (dataType) {
    case DocumentDataType.DOCUMENT:
      return 'COLECCION DE DOCUMENTOS'
    case DocumentDataType.QUERY:
      return 'QUERY'
    case DocumentDataType.VOCABULARY:
      return 'VOCABULARIO'
    case DocumentDataType.STOP_WORDS:
      return 'STOP WORDS'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getTitle'
  }
}

export const getSampleData= (dataType: DocumentDataType): string => {
  switch (dataType) {
    case DocumentDataType.DOCUMENT:
      return 'perro,barco;coche,casa,perro,gato;coche,gato;coche,perro,barco,casa'
    case DocumentDataType.QUERY:
      return 'perro;barco;coche;casa;gato'
    case DocumentDataType.VOCABULARY:
      return 'perro;barco;coche;casa;gato'
    case DocumentDataType.STOP_WORDS:
      return 'a; al; con; de; del; el; en; es; estan; la; los; las; su, un, una, unos, unas, tiene, va, y'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getSampleData'
  }
}