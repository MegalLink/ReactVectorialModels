import { FieldDataType } from '../enums/document-data-type'

export const getLabelFromFile = (dataType: FieldDataType): string => {
  switch (dataType) {
    case FieldDataType.DOCUMENTS:
      return 'Ingrese la coleccion de documentos'
    case FieldDataType.QUERY:
      return 'Ingrese el query'
    case FieldDataType.VOCABULARY:
      return 'Ingrese el vocabulario'
    case FieldDataType.STOP_WORDS:
      return 'Ingrese los stop words'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getLabelFromFile'
  }
}

export const getTitle = (dataType: FieldDataType): string => {
  switch (dataType) {
    case FieldDataType.DOCUMENTS:
      return 'COLECCION DE DOCUMENTOS'
    case FieldDataType.QUERY:
      return 'CONSULTA'
    case FieldDataType.VOCABULARY:
      return 'VOCABULARIO'
    case FieldDataType.STOP_WORDS:
      return 'STOP WORDS'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getTitle'
  }
}

export const getSampleData= (dataType: FieldDataType): string => {
  switch (dataType) {
    case FieldDataType.DOCUMENTS:
      return 'perro,barco;coche,casa,perro,gato;coche,gato;coche,perro,barco,casa'
    case FieldDataType.QUERY:
      return 'perro;barco;coche;casa;gato'
    case FieldDataType.VOCABULARY:
      return 'perro;barco;coche;casa;gato'
    case FieldDataType.STOP_WORDS:
      return 'a; al; con; de; del; el; en; es; estan; la; los; las; su, un, una, unos, unas, tiene, va, y'
    default:
      return '[PROGRAM ERROR] Bad DocumentDataType | getSampleData'
  }
}