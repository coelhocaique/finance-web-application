export interface Debt {
  debt_id: string,
  amount: number,
  description: string,
  debt_date: string,
  installments: string,
  type: string,
  tag: string,
  reference_code: string,
  installment_number: string,
  reference_date: string,
  total_amount: number,
  creation_date: string
}

export interface DebtElement {
  creationDate: string,
  amount: number,
  id: string,
  referenceCode: string,
  installment: string,
  description: string,
  tag: string, 
  type: string,
  totalAmount: number,
  debtDate: string
}