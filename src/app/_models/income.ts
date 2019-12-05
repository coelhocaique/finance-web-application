export interface Income {    
    income_id: string,
    gross_amount: number,
    net_amount: number,
    additional_amount: number,
    discount_amount: number,
    description: string,
    receipt_date: string,
    reference_date: string,
    source_name: string,
    discounts: Discounts[]
  }

  export interface IncomeElement {
    id: string,
    description: string,
    netAmount: number,
    grossAmount: number,
    referenceDate: string,
    discountAmount: number,
    additionalAmount: number
  }

  export interface Discounts {
    amount: number,
    description: string
  }