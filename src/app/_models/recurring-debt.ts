export interface RecurringDebt {
  recurring_debt_id: string,
  amount: number,
  description: string,
  type: string,
  tag: string
  creation_date: string
}

export interface RecurringDebtRetrieval {
  tags: string[],
  types: string[]
}