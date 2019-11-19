export interface Parameter {
  parameter_id: string,
  name: string,
  reference_date: string,
  value: string,
  creation_date: string
}

export interface ParameterElement {
  creationDate: string,
  id: string,
  referenceDate: string,
  name: string,
  value: number
}