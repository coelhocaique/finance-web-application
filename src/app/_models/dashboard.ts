export interface DashboardModel {
  total_income_gross_amount: number,
  total_income_net_amount: number,
  debt_total_amount: number,
  saving_total: number,
  income_net_by_month: DataPoints[],
  income_discount_by_name: DataPoints[],
  income_net_by_source_name: DataPoints[],
  debt_threshold_by_month: DataPoints[],
  debt_by_type: DataPoints[],
  debt_by_tag: DataPoints[],
  debt_by_name: DataPoints[],
  debt_by_month: DataPoints[]
}

export interface DataPoints{
  y: string,
  name: string
}